import React from 'react';

const Services: React.FC = () => {
  const features = [
    { title: 'Branding', desc: 'Identidades visuales consistentes y atemporales.' },
    { title: 'Publicidad', desc: 'Campañas digitales optimizadas para conversión.' },
    { title: 'UX/UI Design', desc: 'Interfaces funcionales de alto impacto visual.' },
    { title: 'Estrategia', desc: 'Consultoría creativa para marcas en expansión.' },
  ];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="reveal">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold text-white mb-4 tracking-tight">
          Nuestros Servicios
        </h2>
        <p className="text-[#9aa0a6] max-w-xl text-[1.1rem] font-light mb-16">
          Soluciones de diseño centradas en el usuario y publicidad basada en datos.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div 
            key={i} 
            className="reveal p-8 border border-[#22262e] bg-[#0f1115] hover:border-[#2c313a] transition-colors"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <h3 className="text-white text-lg font-semibold mb-3 tracking-tight">
              {f.title}
            </h3>
            <p className="text-[#9aa0a6] text-sm leading-relaxed font-light">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;