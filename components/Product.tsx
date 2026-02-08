
import React from 'react';
import FoilCard from './ui/FoilCard';

const Services: React.FC = () => {
  const features = [
    { title: 'Branding', desc: 'Identidades visuales consistentes y atemporales para marcas que buscan trascender.' },
    { title: 'Publicidad', desc: 'Estrategias de pauta digital optimizadas quirúrgicamente para maximizar retorno.' },
    { title: 'UX/UI Design', desc: 'Interfaces funcionales de alto impacto visual centradas en la experiencia humana.' },
    { title: 'Estrategia', desc: 'Consultoría creativa enfocada en el posicionamiento premium y expansión de mercado.' },
  ];

  return (
    <div className="py-40 px-6 max-w-7xl mx-auto">
      <div className="reveal mb-24">
        <h2 className="text-[clamp(2rem,5vw,3rem)] font-semibold text-white mb-6 tracking-tighter">
          Nuestros Servicios
        </h2>
        <p className="text-[#9aa0a6] max-w-2xl text-[1.1rem] font-light leading-relaxed">
          Diseñamos el futuro de las marcas digitales. Fusionamos la estética editorial con la tecnología de vanguardia para crear experiencias memorables.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <FoilCard 
            key={i} 
            className="reveal border-[#22262e]/40"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="p-10 h-full flex flex-col">
              <span className="text-[10px] text-[#9aa0a6] tracking-[0.4em] uppercase mb-8 opacity-50">0{i + 1}</span>
              <h3 className="text-white text-xl font-semibold mb-4 tracking-tight">
                {f.title}
              </h3>
              <p className="text-[#9aa0a6] text-sm leading-relaxed font-light mt-auto">
                {f.desc}
              </p>
            </div>
          </FoilCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
