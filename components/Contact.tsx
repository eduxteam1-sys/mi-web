
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="py-40 bg-transparent border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black font-syncopate mb-12 tracking-tighter leading-tight">
          ¿LISTO PARA EL SIGUIENTE NIVEL?
        </h2>
        <p className="text-gray-400 text-xl font-light leading-relaxed mb-16 max-w-2xl mx-auto">
          Estamos buscando socios visionarios que deseen transformar su presencia digital en una obra maestra de diseño y estrategia.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 text-center">
          <div className="p-8 border border-white/5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
            <span className="text-[10px] tracking-[0.5em] uppercase text-gray-500 block mb-4">Directorio</span>
            <a href="mailto:hello@jrex.com" className="text-2xl font-light hover:text-white transition-colors underline underline-offset-8 decoration-gray-700">hello@jrex.com</a>
          </div>
          <div className="p-8 border border-white/5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
            <span className="text-[10px] tracking-[0.5em] uppercase text-gray-500 block mb-4">Estudio</span>
            <span className="text-2xl font-light">Zurich, Switzerland</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
