import React from 'react';

const TechFlowSection: React.FC = () => {
  const nodes = [
    { title: 'Idea', desc: 'Concepto disruptivo', side: 'left', top: '0%' },
    { title: 'Estrategia', desc: 'Hoja de ruta clara', side: 'right', top: '25%' },
    { title: 'Diseño', desc: 'Interfaz premium', side: 'left', top: '50%' },
    { title: 'Desarrollo', desc: 'Código de alto rendimiento', side: 'right', top: '75%' },
    { title: 'Optimización', desc: 'Escalado continuo', side: 'left', top: '100%' },
  ];

  return (
    <section className="py-32 px-6 bg-transparent overflow-hidden relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="text-center mb-20 reveal">
          <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">Workflow Tecnológico</h2>
          <p className="text-[#9aa0a6] font-light max-w-md mx-auto">Un proceso lineal optimizado para la entrega de productos digitales de alta gama.</p>
        </div>

        {/* Workflow Visual Container */}
        <div className="relative w-full h-[600px] flex justify-center">
          
          {/* Central Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-[#22262e]">
            {/* Pulsing glow line */}
            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-glow-flow"></div>
          </div>

          {/* Nodes */}
          {nodes.map((node, i) => (
            <div 
              key={i}
              className={`absolute flex items-center gap-6 group cursor-default reveal`}
              style={{ 
                top: node.top, 
                left: node.side === 'left' ? 'auto' : '50%',
                right: node.side === 'right' ? 'auto' : '50%',
                transform: `translateY(-50%) ${node.side === 'left' ? 'translateX(-100%)' : 'translateX(0)'}`,
                transitionDelay: `${i * 0.15}s`
              }}
            >
              {node.side === 'right' && <div className="w-12 h-[1px] bg-[#22262e] group-hover:bg-blue-500/50 transition-colors" />}
              
              <div className={`flex flex-col ${node.side === 'left' ? 'items-end text-right' : 'items-start text-left'}`}>
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full border border-[#22262e] bg-[#0f1115] flex items-center justify-center text-[10px] uppercase tracking-widest text-[#9aa0a6] group-hover:border-blue-500 group-hover:text-white transition-all duration-500 animate-float-slow group-hover:scale-110 shadow-lg`}>
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-blue-500/10 blur-xl transition-opacity"></div>
                    {i + 1}
                  </div>
                </div>
                
                <div className="mt-4 transition-all duration-300">
                  <h4 className="text-white text-sm font-semibold tracking-tight">{node.title}</h4>
                  <p className="text-[#9aa0a6] text-[10px] font-light uppercase tracking-widest overflow-hidden h-0 group-hover:h-4 opacity-0 group-hover:opacity-100 transition-all duration-500 mt-1">
                    {node.desc}
                  </p>
                </div>
              </div>

              {node.side === 'left' && <div className="w-12 h-[1px] bg-[#22262e] group-hover:bg-blue-500/50 transition-colors" />}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes glow-flow {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-glow-flow {
          animation: glow-flow 4s linear infinite;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default TechFlowSection;