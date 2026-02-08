
import React from 'react';
import FoilCard from './ui/FoilCard';

const Contact: React.FC = () => {
  return (
    <div className="py-32 px-6 max-w-5xl mx-auto text-center">
      <div className="reveal">
        <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-semibold text-white mb-8 tracking-tighter">
          Conectemos.
        </h2>
        <p className="text-[#9aa0a6] text-[1.1rem] font-light mb-16 max-w-xl mx-auto">
          Estamos disponibles para nuevos proyectos y consultorías estratégicas.
        </p>
        
        <FoilCard className="p-12 md:p-20">
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
            <div className="text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#9aa0a6] block mb-2">Escríbenos</span>
              <a href="mailto:eduxteam1@gmail.com" className="text-xl md:text-3xl font-light text-white hover:opacity-70 transition-opacity border-b border-[#22262e] pb-1">
                eduxteam1@gmail.com
              </a>
            </div>
            <div className="text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#9aa0a6] block mb-2">Visítanos</span>
              <span className="text-xl md:text-3xl font-light text-[#e6e6e6]">Reconquista, Santa Fe</span>
            </div>
          </div>
        </FoilCard>
      </div>
    </div>
  );
};

export default Contact;
