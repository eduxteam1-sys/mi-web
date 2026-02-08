import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: '¿Qué tiempo toma un proyecto?', a: 'Normalmente entre 3 y 6 semanas dependiendo del alcance.' },
    { q: '¿Ofrecen mantenimiento?', a: 'Sí, contamos con planes de soporte mensual para todos nuestros desarrollos.' },
    { q: '¿Cómo iniciamos?', a: 'Agendamos una breve llamada de descubrimiento para entender sus objetivos.' }
  ];

  return (
    <div className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-white mb-16 text-center reveal tracking-tight opacity-80 uppercase tracking-[0.2em]">
        Preguntas Frecuentes
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className="border-b border-[#22262e]/50 bg-transparent transition-all duration-300"
          >
            <button 
              className="w-full py-8 text-left flex justify-between items-center group"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-sm font-light text-[#e6e6e6] tracking-tight group-hover:text-white transition-colors">{faq.q}</span>
              <span className={`text-[10px] text-[#9aa0a6] transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`}>
                {openIndex === i ? '—' : '+'}
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-40 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-sm text-[#9aa0a6] font-light leading-relaxed max-w-xl">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;