import React from 'react';

const Reviews: React.FC = () => {
  const reviews = [
    { name: 'Ricardo V.', role: 'LUXE Global', text: 'Resultados tangibles desde el primer mes. Su enfoque en el diseño es impecable.' },
    { name: 'Silvia Marín', role: 'Aura Studio', text: 'El minimalismo que buscábamos para nuestra marca. Profesionales y efectivos.' },
    { name: 'David G.', role: 'TechFlow', text: 'Una agencia que realmente entiende la intersección entre diseño y negocio.' },
  ];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16 reveal">
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">Testimonios</h2>
        <div className="w-12 h-[2px] bg-white opacity-20"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {reviews.map((r, i) => (
          <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
            <p className="text-[#e6e6e6] text-lg font-light leading-snug mb-8">
              "{r.text}"
            </p>
            <div>
              <h4 className="text-white text-sm font-semibold tracking-tight">{r.name}</h4>
              <p className="text-[#9aa0a6] text-[10px] uppercase tracking-widest mt-1">{r.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;