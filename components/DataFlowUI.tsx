import React, { useState } from 'react';

const modules = [
  { id: 'automation', title: 'Automation', desc: 'Sistemas autónomos inteligentes.', icon: '⚡', x: 25, y: 20 },
  { id: 'apis', title: 'APIs', desc: 'Integración universal sin fricción.', icon: '🔌', x: 75, y: 15 },
  { id: 'bots', title: 'AI Bots', desc: 'Agentes conversacionales premium.', icon: '🤖', x: 88, y: 60 },
  { id: 'analytics', title: 'Analytics', desc: 'Datos convertidos en estrategia.', icon: '📊', x: 12, y: 65 },
  { id: 'integrations', title: 'Ecosystem', desc: 'Conexión total en tiempo real.', icon: '🌐', x: 50, y: 88 },
];

const DataFlowUI: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section className="py-40 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-24 reveal">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-tight text-white mb-4">
            Sistema Activo de Inteligencia
          </h2>
          <p className="text-[#9aa0a6] font-light max-w-lg mx-auto text-sm tracking-wide">
            Nuestra arquitectura de automatización opera en una red distribuida de nodos integrados.
          </p>
        </div>

        {/* Visual Engine Container */}
        <div className="relative w-full aspect-square md:aspect-video bg-[#0f1115]/40 border border-white/5 rounded-3xl backdrop-blur-2xl overflow-hidden group">
          
          {/* UI Connector Layer - Complex Vector Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {modules.map((m) => {
              const startX = 50;
              const startY = 50;
              const endX = m.x;
              const endY = m.y;
              
              // Calculate path: Arc/Bezier from center to node
              const midX = (startX + endX) / 2;
              const midY = (startY + endY) / 2;
              const pathD = `M ${startX}% ${startY}% Q ${midX}% ${startY}% ${endX}% ${endY}%`;

              return (
                <g key={m.id}>
                  {/* Subtle Background Trace */}
                  <path 
                    d={pathD} 
                    stroke="rgba(255, 255, 255, 0.03)" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                  {/* Main UI Connector Line */}
                  <path 
                    d={pathD} 
                    stroke={hoveredNode === m.id ? 'url(#activeGradient)' : 'rgba(59, 130, 246, 0.1)'} 
                    strokeWidth={hoveredNode === m.id ? '2' : '1'} 
                    fill="none" 
                    className="transition-all duration-500"
                    strokeDasharray={hoveredNode === m.id ? 'none' : '4 12'}
                  />
                  {/* Flowing Data Pulse (Particle) */}
                  <circle r="1.5" fill="#3b82f6" className="animate-particle">
                    <animateMotion 
                      dur={`${3 + Math.random() * 2}s`} 
                      repeatCount="indefinite" 
                      path={`M 50% 50% Q ${midX}% 50% ${endX}% ${endY}%`} 
                    />
                  </circle>
                  
                  {/* Connection Node Point at Center */}
                  <circle cx="50%" cy="50%" r="2" fill="rgba(59, 130, 246, 0.4)" />
                  {/* Connection Node Point at Icon */}
                  <circle cx={`${m.x}%`} cy={`${m.y}%`} r="3" fill={hoveredNode === m.id ? "#3b82f6" : "rgba(255,255,255,0.1)"} className="transition-colors duration-300" />
                </g>
              );
            })}
            <defs>
              <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central AI Brain Node - The Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-[#0a0b0d] border border-blue-500/40 flex items-center justify-center relative shadow-[0_0_60px_rgba(59,130,246,0.15)] group-hover:border-blue-400 transition-colors duration-500">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl animate-glow"></div>
              {/* Spinning UI Ring */}
              <div className="absolute -inset-2 md:-inset-4 border border-blue-400/10 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
              
              <div className="text-2xl md:text-4xl font-black tracking-tighter text-white z-10 select-none group-hover:scale-110 transition-transform duration-500">
                JREX
              </div>
            </div>
          </div>

          {/* Orbital Modules */}
          {modules.map((m) => (
            <div 
              key={m.id}
              className={`absolute flex flex-col items-center gap-3 transition-all duration-700 cursor-pointer z-30`}
              style={{ 
                left: `${m.x}%`, 
                top: `${m.y}%`, 
                transform: 'translate(-50%, -50%)',
                opacity: hoveredNode && hoveredNode !== m.id ? 0.3 : 1
              }}
              onMouseEnter={() => setHoveredNode(m.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-[#15181e] border border-white/10 flex items-center justify-center text-2xl md:text-3xl shadow-2xl transition-all duration-500 backdrop-blur-md ${hoveredNode === m.id ? 'border-blue-500/60 scale-125 -translate-y-4 shadow-[0_0_30px_rgba(59,130,246,0.2)] bg-[#1a1e26]' : ''}`}>
                 {m.icon}
              </div>
              
              <div className={`text-center transition-all duration-500 ${hoveredNode === m.id ? 'opacity-100' : 'opacity-0 scale-90 translate-y-2'}`}>
                <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white mb-1">{m.title}</h4>
                <p className="text-[9px] text-[#9aa0a6] uppercase tracking-wider whitespace-nowrap">{m.desc}</p>
              </div>
            </div>
          ))}

          {/* Background Ambient Layers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        </div>
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.15); }
        }
        @keyframes particle {
          0% { opacity: 0; transform: scale(0.3); }
          20% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.3); }
        }
        .animate-glow {
          animation: glow 5s ease-in-out infinite;
        }
        .animate-particle {
          animation: particle linear infinite;
        }
      `}</style>
    </section>
  );
};

export default DataFlowUI;