import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0f1115] flex flex-col items-center justify-center">
      <div className="relative">
        <h1 className="text-4xl font-semibold tracking-tighter text-white">
          JREX
        </h1>
        <div 
          className="absolute -bottom-2 left-0 h-[1px] bg-white w-full scale-x-0 animate-[loading-line_0.8s_cubic-bezier(0.65,0,0.35,1)_infinite]"
          style={{ willChange: 'transform' }}
        ></div>
      </div>
      <style>{`
        @keyframes loading-line {
          0% { transform: scaleX(0); transform-origin: left; }
          45% { transform: scaleX(1); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;