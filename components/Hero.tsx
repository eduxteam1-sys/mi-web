import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center pt-20 bg-[#0f1115]">
      <div className="max-w-4xl mx-auto px-6 text-center reveal">
        <p className="text-[0.8rem] tracking-[0.4em] text-[#9aa0a6] uppercase mb-6 font-light">
          Estrategia & Diseño Premium
        </p>
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-semibold text-white tracking-tight leading-[1.1] mb-8">
          JREX STUDIO
        </h1>
        <p className="max-w-2xl mx-auto text-[#9aa0a6] text-[clamp(1rem,2vw,1.2rem)] font-light leading-relaxed mb-6">
          Transformamos marcas mediante diseño minimalista y publicidad disruptiva enfocada en el rendimiento.
        </p>
      </div>
    </div>
  );
};

export default Hero;