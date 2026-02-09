
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, Type, FunctionDeclaration } from '@google/genai';
import { decode, decodeAudioData, createBlob } from '../utils/audioConverter';

const VOICE_MODEL = 'gemini-2.5-flash-native-audio-preview-12-2025';
const IMAGE_MODEL = 'gemini-2.5-flash-image';

const VoiceInterface: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sofiaAvatar, setSofiaAvatar] = useState<string | null>(null);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('Córdoba, Argentina');

  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Declaración de herramientas para Sofía
  const playMusicTool: FunctionDeclaration = {
    name: 'reproducir_musica',
    parameters: {
      type: Type.OBJECT,
      description: 'Reproduce una canción específica solicitada por el usuario.',
      properties: {
        cancion: { type: Type.STRING, description: 'Nombre de la canción y el artista.' },
      },
      required: ['cancion'],
    },
  };

  // Generación inicial del avatar realista con NanoBanana
  useEffect(() => {
    const generateAvatar = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        const response = await ai.models.generateContent({
          model: IMAGE_MODEL,
          contents: {
            parts: [{ text: "Hyper-realistic close-up portrait of a 25-year-old blonde Argentinian woman, intelligent eyes, soft smile, cinematic dark studio lighting, professional photography style." }]
          },
          config: { imageConfig: { aspectRatio: "1:1" } }
        });
        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (part?.inlineData) setSofiaAvatar(`data:image/png;base64,${part.inlineData.data}`);
      } catch (e) {
        console.error("Error al generar avatar:", e);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation(`Lat: ${pos.coords.latitude.toFixed(2)}, Lon: ${pos.coords.longitude.toFixed(2)}`);
      });
    }
    generateAvatar();
  }, []);

  const cleanup = useCallback(() => {
    if (sessionRef.current) {
        try { sessionRef.current.close(); } catch(e) {}
        sessionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    activeSourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    activeSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    setIsActive(false);
    setIsConnecting(false);
    setIsSpeaking(false);
    setCurrentSong(null);
  }, []);

  const connectToSofia = async () => {
    if (isActive) {
      cleanup();
      return;
    }

    try {
      setIsConnecting(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      audioContextInRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const systemPrompt = `Tu nombre es Sofía. Eres una joven de Mar del Plata, Argentina.
      PERSONALIDAD Y VOZ: Hablas con acento marplatense (voseo, entonación fluida). 
      TONO EMOCIONAL: Si la noticia o información es alegre, tu tono debe ser entusiasta y brillante. Si es información técnica, dólar, bolsa o política seria, tu tono debe ser profesional, calmado y serio.
      REALISMO: Incluye susurros suaves, respiraciones profundas antes de hablar y pausas naturales. No seas robótica.
      DINÁMICA:
      1. Solo responde cuando te digan "Sofía".
      2. Si te dicen "Sofía, detente" o "pausa", detén inmediatamente tu discurso y quédate en silencio.
      3. Tu ubicación es ${location}.
      4. NOTICIAS: Si te piden el resumen, da exactamente 10 noticias relevantes de Argentina y Córdoba (Dólar, Bolsa, Industria, Política).
      5. MÚSICA: Si te piden una canción, usa la función 'reproducir_musica'.`;

      const sessionPromise = ai.live.connect({
        model: VOICE_MODEL,
        config: {
          responseModalities: [Modality.AUDIO],
          tools: [{ googleSearch: {} }, { functionDeclarations: [playMusicTool] }],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          systemInstruction: systemPrompt
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            
            if (audioContextInRef.current && mediaStreamRef.current) {
              const source = audioContextInRef.current.createMediaStreamSource(mediaStreamRef.current);
              const scriptProcessor = audioContextInRef.current.createScriptProcessor(4096, 1, 1);
              scriptProcessor.onaudioprocess = (e) => {
                const pcmBlob = createBlob(e.inputBuffer.getChannelData(0));
                sessionPromise.then(session => {
                  if (session) session.sendRealtimeInput({ media: pcmBlob });
                });
              };
              source.connect(scriptProcessor);
              scriptProcessor.connect(audioContextInRef.current.destination);
            }
          },
          onmessage: async (msg) => {
            if (msg.toolCall) {
              msg.toolCall.functionCalls.forEach(fc => {
                if (fc.name === 'reproducir_musica') {
                  setCurrentSong(fc.args.cancion as string);
                  sessionPromise.then(s => s.sendToolResponse({
                    functionResponses: { id: fc.id, name: fc.name, response: { status: 'ok' } }
                  }));
                }
              });
            }

            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextOutRef.current) {
              setIsSpeaking(true);
              const ctx = audioContextOutRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.onended = () => {
                activeSourcesRef.current.delete(source);
                if (activeSourcesRef.current.size === 0) setIsSpeaking(false);
              };
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              activeSourcesRef.current.add(source);
            }

            if (msg.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              activeSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onerror: () => cleanup(),
          onclose: () => cleanup()
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (e) {
      console.error("Error al conectar:", e);
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-2xl border-2 border-white/20 p-6 md:p-10 flex flex-col items-center justify-between min-h-[500px] md:min-h-[600px] w-full rounded-[2rem] shadow-2xl transition-all">
      
      {/* Indicador de Música */}
      {currentSong && (
        <div className="w-full bg-pink-600/20 border border-pink-500/50 text-pink-200 px-4 py-3 mb-6 rounded-xl flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex gap-1">
                <span className="w-1 h-3 bg-pink-400 animate-music-bar-1"></span>
                <span className="w-1 h-4 bg-pink-400 animate-music-bar-2"></span>
                <span className="w-1 h-2 bg-pink-400 animate-music-bar-3"></span>
            </div>
            <span className="text-xs font-bold truncate">Sonando: {currentSong}</span>
          </div>
          <button onClick={() => setCurrentSong(null)} className="text-pink-400 hover:text-white transition-colors">✕</button>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center w-full space-y-8">
        
        {/* Avatar Articulado V5 */}
        <div className="relative perspective-1000">
          <div className={`relative w-44 h-44 md:w-60 md:h-60 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl transition-all duration-[2000ms] ease-in-out
            ${isActive ? 'animate-sofia-breath border-pink-500/50 shadow-pink-500/20' : 'grayscale opacity-60'}`}>
            
            {sofiaAvatar ? (
              <div className={`relative w-full h-full transition-transform duration-[3000ms] ${isActive ? 'animate-sofia-head-move' : ''}`}>
                <img 
                  src={sofiaAvatar} 
                  className={`w-full h-full object-cover transition-transform duration-[4000ms] ${isActive ? 'scale-110' : 'scale-100'}`} 
                  alt="Sofía Avatar" 
                />
                
                {/* Capa de Pestañeo Natural (Irregular) */}
                <div className="absolute top-[38%] left-0 w-full flex justify-around px-10 opacity-0 animate-sofia-blink pointer-events-none">
                    <div className="w-10 h-[3px] bg-slate-900/50 rounded-full blur-[1px]"></div>
                    <div className="w-10 h-[3px] bg-slate-900/50 rounded-full blur-[1px]"></div>
                </div>

                {/* Capa de Boca Articulada Reactiva Sincronizada */}
                {isSpeaking && (
                   <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-10 h-3 bg-pink-400/20 rounded-full blur-lg animate-sofia-mouth"></div>
                )}
                
                {/* Overlay de Luz Ambiental */}
                {isSpeaking && (
                  <div className="absolute inset-0 bg-pink-500/5 mix-blend-soft-light animate-pulse"></div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-800">
                <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {/* Badge flotante de estado */}
          <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all shadow-lg
            ${isActive ? 'bg-pink-500 text-white border-pink-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
            {isActive ? (isSpeaking ? 'Respondiendo...' : 'Te escucho') : 'Desconectada'}
          </div>
        </div>

        <div className="text-center w-full space-y-2">
          <h2 className={`text-2xl md:text-3xl font-black text-white uppercase tracking-tighter transition-all duration-700 ${isSpeaking ? 'text-pink-400 scale-105' : ''}`}>
            {isActive ? (isSpeaking ? 'Analizando...' : 'Di "Sofía..."') : 'Toca para iniciar'}
          </h2>
          <div className="flex items-center justify-center gap-3">
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{location.includes('Lat') ? 'Conexión GPS Estable' : 'Localizando...'}</span>
          </div>
        </div>
      </div>

      {/* Control Principal */}
      <div className="w-full mt-10">
        <button
          onClick={connectToSofia}
          disabled={isConnecting}
          className={`group relative w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] transition-all overflow-hidden border-2
            ${isActive 
              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50' 
              : 'bg-white text-slate-950 border-white hover:bg-pink-500 hover:text-white hover:border-pink-400'
            } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="relative z-10">
            {isConnecting ? 'Sincronizando...' : isActive ? 'Terminar Sesión' : 'Despertar a Sofía'}
          </span>
          {!isActive && !isConnecting && (
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          )}
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        
        @keyframes sofia-breath { 
          0%, 100% { transform: scale(1) translateY(0); box-shadow: 0 0 30px rgba(236, 72, 153, 0.1); } 
          50% { transform: scale(1.01) translateY(-2px); box-shadow: 0 0 50px rgba(236, 72, 153, 0.25); } 
        }

        @keyframes sofia-head-move {
          0%, 100% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          25% { transform: rotateX(1deg) rotateY(2deg) rotateZ(0.5deg); }
          50% { transform: rotateX(-1deg) rotateY(-1deg) rotateZ(-0.5deg); }
          75% { transform: rotateX(0.5deg) rotateY(1deg) rotateZ(0.2deg); }
        }

        @keyframes sofia-blink { 
          0%, 90%, 94%, 98%, 100% { opacity: 0; } 
          92%, 96% { opacity: 0.85; transform: scaleY(1); }
        }

        @keyframes sofia-mouth { 
          0%, 100% { height: 2px; transform: translateX(-50%) scaleX(0.8); opacity: 0.2; } 
          30% { height: 10px; transform: translateX(-50%) scaleX(1.1); opacity: 0.5; } 
          60% { height: 16px; transform: translateX(-50%) scaleX(1.3); opacity: 0.6; } 
          80% { height: 12px; transform: translateX(-50%) scaleX(1.2); opacity: 0.4; } 
        }

        @keyframes music-bar-1 { 0%, 100% { height: 8px; } 50% { height: 16px; } }
        @keyframes music-bar-2 { 0%, 100% { height: 16px; } 50% { height: 8px; } }
        @keyframes music-bar-3 { 0%, 100% { height: 4px; } 50% { height: 12px; } }
        
        .animate-sofia-breath { animation: sofia-breath 6s ease-in-out infinite; }
        .animate-sofia-head-move { animation: sofia-head-move 12s ease-in-out infinite; }
        .animate-sofia-blink { animation: sofia-blink 7s ease-in-out infinite; }
        .animate-sofia-mouth { animation: sofia-mouth 0.14s ease-in-out infinite; }
        .animate-music-bar-1 { animation: music-bar-1 0.6s ease-in-out infinite; }
        .animate-music-bar-2 { animation: music-bar-2 0.8s ease-in-out infinite; }
        .animate-music-bar-3 { animation: music-bar-3 0.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default VoiceInterface;
