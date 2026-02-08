
import React from 'react';

const Reviews: React.FC = () => {
  const reviews = [
    { name: 'Ricardo V.', role: 'Director de Marketing, LUXE', text: 'JREX no solo diseñó nuestro sitio, rediseñó nuestra forma de comunicar. El impacto en nuestras conversiones fue inmediato y masivo.' },
    { name: 'Silvia Marín', role: 'Fundadora de Aura', text: 'Un estudio que entiende la elegancia y la funcionalidad. Su enfoque minimalista fue exactamente lo que nuestra marca necesitaba para destacar.' },
    { name: 'David G.', role: 'CMO, TechFlow', text: 'Creatividad disruptiva. No se conforman con lo convencional; empujan los límites de lo que es posible en la publicidad digital.' },
  ];

  return (
    <div className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold font-syncopate tracking-widest uppercase mb-4">Feedback</h2>
          <div className="w-12 h-0.5 bg-white mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {reviews.map((r, i) => (
            <div key={i} className="p-12 border border-white/10 hover:border-white/40 transition-all duration-500 group">
              <div className="mb-8 text-4xl text-gray-800 group-hover:text-white transition-colors">“</div>
              <p className="text-gray-400 text-lg italic mb-8 font-light leading-relaxed">
                {r.text}
              </p>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-widest">{r.name}</h4>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-1">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
