import React, { useRef, useEffect } from 'react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const state = useRef({
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    lerp: 0.1
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      state.current.targetX = (e.clientX - centerX) / (window.innerWidth / 2);
      state.current.targetY = (e.clientY - centerY) / (window.innerHeight / 2);
    };

    const update = () => {
      state.current.currentX += (state.current.targetX - state.current.currentX) * state.current.lerp;
      state.current.currentY += (state.current.targetY - state.current.currentY) * state.current.lerp;

      if (cardRef.current) {
        const rotateY = state.current.currentX * 28; 
        const rotateX = state.current.currentY * -28;
        
        cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        const shineX = (state.current.currentX + 1) * 50;
        const shineY = (state.current.currentY + 1) * 50;
        cardRef.current.style.setProperty('--sx', `${shineX}%`);
        cardRef.current.style.setProperty('--sy', `${shineY}%`);
      }

      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-hero bg-transparent">
      <div 
        ref={cardRef} 
        className="preserve-3d flex flex-col items-center justify-center transition-transform duration-75 ease-out pointer-events-none"
      >
        <div className="relative pointer-events-auto flex flex-col items-center">
          <span className="text-[10px] md:text-[12px] tracking-[0.8em] text-[#9aa0a6] uppercase font-light mb-4 block text-center opacity-80" style={{ transform: 'translateZ(60px)' }}>
            Estrategia y Diseño premium
          </span>

          <h1 
            className="text-[clamp(6rem,28vw,24rem)] font-extrabold tracking-tighter leading-none select-none holographic-text relative py-4 px-8"
            style={{
              backgroundImage: `
                radial-gradient(
                  circle at var(--sx, 50%) var(--sy, 50%),
                  rgba(255, 255, 255, 1) 0%,
                  rgba(100, 200, 255, 0.4) 15%,
                  rgba(50, 50, 60, 0.1) 40%,
                  transparent 80%
                ),
                linear-gradient(to bottom, #ffffff 15%, #222222 85%)
              `,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.8))',
              transform: 'translateZ(120px)'
            } as React.CSSProperties}
          >
            JREX

            {/* UI Connectors following letter paths - simulating letter silhouettes */}
            <svg className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
              {/* 'J' logic line */}
              <path d="M240,150 L240,240 Q240,280 200,280" stroke="url(#lineGrad)" strokeWidth="1.2" fill="none" strokeDasharray="3 6" className="animate-dash" />
              {/* 'R' logic loop */}
              <path d="M380,280 L380,150 Q450,150 450,195 Q450,240 380,240 L450,280" stroke="url(#lineGrad)" strokeWidth="1.2" fill="none" strokeDasharray="3 6" className="animate-dash" style={{ animationDelay: '-2s' }} />
              {/* 'E' logic spine */}
              <path d="M600,150 L530,150 L530,280 L600,280 M530,215 L580,215" stroke="url(#lineGrad)" strokeWidth="1.2" fill="none" strokeDasharray="3 6" className="animate-dash" style={{ animationDelay: '-4s' }} />
              {/* 'X' logic cross */}
              <path d="M680,150 L780,280 M780,150 L680,280" stroke="url(#lineGrad)" strokeWidth="1.2" fill="none" strokeDasharray="3 6" className="animate-dash" style={{ animationDelay: '-6s' }} />
              
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </h1>
        </div>
      </div>

      {/* Floating UI Detail */}
      <div className="absolute top-1/4 left-10 opacity-20 hidden md:block" style={{ transform: 'rotate(-15deg)' }}>
        <div className="border border-white/10 p-2 rounded text-[8px] uppercase tracking-widest text-blue-400">System_Active // 001</div>
      </div>
      <div className="absolute bottom-1/4 right-10 opacity-20 hidden md:block" style={{ transform: 'rotate(15deg)' }}>
        <div className="border border-white/10 p-2 rounded text-[8px] uppercase tracking-widest text-cyan-400">Logic_Path // TRACE</div>
      </div>

      <style>{`
        .holographic-text {
          background-size: 250% 250%;
          transition: background-position 0.1s ease-out;
        }
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
        .animate-dash {
          animation: dash 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;