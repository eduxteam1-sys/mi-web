
import React from 'react';
import VoiceInterface from './components/VoiceInterface';

const App: React.FC = () => {
  return (
    <div className="min-h-screen h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      {/* Fondo con degradado animado oscuro */}
      <div className="absolute inset-0 z-0 animate-gradient-slow opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-900 rounded-full blur-[100px]"></div>
      </div>
      
      <header className="mb-4 md:mb-8 text-center z-10">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase drop-shadow-lg">
          Sofía <span className="text-pink-500">AI</span>
        </h1>
        <div className="flex items-center justify-center gap-2">
            <span className="h-1 w-12 bg-pink-500"></span>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em]">Deep Voice Experience</p>
            <span className="h-1 w-12 bg-pink-500"></span>
        </div>
      </header>
      
      <main className="w-full max-w-lg z-10 overflow-visible">
        <VoiceInterface />
      </main>

      <style>{`
        @keyframes gradient-slow {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.1) translate(2%, 2%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        .animate-gradient-slow {
          animation: gradient-slow 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
