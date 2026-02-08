
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000">
      <div className="relative overflow-hidden">
        <h1 className="text-5xl md:text-8xl font-black font-syncopate tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 animate-pulse">
          JREX
        </h1>
        <div className="absolute bottom-0 left-0 h-[2px] bg-white w-full -translate-x-full animate-[loading-bar_2s_ease-in-out_infinite]"></div>
      </div>
      <p className="mt-8 text-xs tracking-[0.5em] text-gray-500 uppercase animate-pulse">
        Cargando Experiencia...
      </p>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
