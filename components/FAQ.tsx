
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
      <h2 className="text-2xl font-semibold text-white mb-12 text-center reveal">Preguntas Frecuentes</h2>
      
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className="reveal border border-[#22262e] bg-[#15181e]/80 backdrop-blur-sm overflow-hidden rounded-md animated-border"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <button 
              className="relative w-full p-6 text-left flex justify-between items-center z-10 bg-transparent"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-sm font-medium text-[#e6e6e6] tracking-tight">{faq.q}</span>
              <span className={`text-[#9aa0a6] transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
            {openIndex === i && (
              <div className="relative z-10 px-6 pb-6 text-sm text-[#9aa0a6] font-light leading-relaxed bg-transparent">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
