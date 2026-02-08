
import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: '¿Cómo es su proceso creativo?', a: 'Iniciamos con una fase de inmersión estratégica para entender su marca, seguida de exploración conceptual y ejecución técnica de alta precisión.' },
    { q: '¿Trabajan con startups o solo grandes empresas?', a: 'Trabajamos con cualquier marca que busque la excelencia. Valoramos la ambición y la visión sobre el tamaño de la organización.' },
    { q: '¿Qué servicios de publicidad ofrecen?', a: 'Desde campañas de redes sociales de alto rendimiento hasta dirección de arte para medios tradicionales y branding 360.' },
    { q: '¿Cuáles son los plazos de entrega?', a: 'Varían según la complejidad, pero priorizamos la calidad sobre la velocidad. Un branding completo suele tomar entre 4 y 8 semanas.' },
  ];

  return (
    <div className="py-32 bg-black">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold font-syncopate mb-16 text-center tracking-[0.2em] uppercase">Metodología</h2>
        
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border-b border-white/10 pb-6 cursor-pointer group"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center group-hover:pl-2 transition-all duration-300">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-white">{faq.q}</h3>
                <span className={`text-xl transition-transform duration-500 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
              </div>
              {openIndex === i && (
                <div className="mt-6 text-gray-500 text-sm leading-relaxed animate-[fadeIn_0.5s_ease-out]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default FAQ;
