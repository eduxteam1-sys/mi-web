
import React, { useEffect, useRef, useState } from 'react';

const Hero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations
  const bgScale = 1 + scrollProgress * 0.3;
  const opacity = 1 - scrollProgress * 1.5;
  const textTranslateY = scrollProgress * 150;

  return (
    <div ref={heroRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated Background Layers */}
        <div 
          className="absolute inset-0 z-0 transition-transform duration-75"
          style={{ transform: `scale(${bgScale})` }}
        >
          {/* New Design Agency Cinematic Image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>
          {/* Radial Gradient for focus */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]"></div>
        </div>

        {/* Content */}
        <div 
          className="relative z-10 text-center px-6"
          style={{ opacity: opacity, transform: `translateY(${-textTranslateY}px)` }}
        >
          <p className="text-sm tracking-[0.6em] text-gray-400 uppercase mb-4 animate-[fadeIn_1s_ease-out]">
            Diseño & Publicidad de Vanguardia
          </p>
          <h1 className="text-8xl md:text-[12rem] font-black font-syncopate tracking-tighter leading-none mb-4 selection:text-black selection:bg-white transition-all">
            JREX
          </h1>
          <h2 className="text-2xl md:text-4xl font-light tracking-[0.3em] uppercase text-gray-300 mb-8">
            Estudio <span className="text-white">Creativo</span>
          </h2>
          <p className="max-w-lg mx-auto text-gray-400 text-lg mb-12 font-light leading-relaxed">
            Transformamos marcas en iconos culturales mediante estrategia disruptiva y estética cinematográfica.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="px-12 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/10">
              Ver Portafolio
            </button>
            <button className="px-12 py-5 border border-white text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-95">
              Nuestra Visión
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
