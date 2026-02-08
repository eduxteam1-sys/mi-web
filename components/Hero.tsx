import React, { useRef, useEffect } from 'react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rafRef = useRef<number | null>(null);
  const state = useRef({
    mouseX: 0.5,
    mouseY: 0.5,
    currentX: 0.5,
    currentY: 0.5,
    lerp: 0.08,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      state.current.mouseX = x;
      state.current.mouseY = y;
    };

    const handleMouseLeave = () => {
      state.current.mouseX = 0.5;
      state.current.mouseY = 0.5;
    };

    const update = () => {
      const { mouseX, mouseY, currentX, currentY, lerp } = state.current;
      
      state.current.currentX += (mouseX - currentX) * lerp;
      state.current.currentY += (mouseY - currentY) * lerp;

      if (titleRef.current) {
        // Tilt effect
        const rotateY = (state.current.currentX - 0.5) * 15; 
        const rotateX = (state.current.currentY - 0.5) * -15; 
        
        // Holographic Shine position
        const shineX = state.current.currentX * 100;
        const shineY = state.current.currentY * 100;

        titleRef.current.style.setProperty('--rx', `${rotateX}deg`);
        titleRef.current.style.setProperty('--ry', `${rotateY}deg`);
        titleRef.current.style.setProperty('--sx', `${shineX}%`);
        titleRef.current.style.setProperty('--sy', `${shineY}%`);
      }

      rafRef.current = requestAnimationFrame(update);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(update);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent perspective-[1000px]"
    >
      {/* UI Connector Vector Lines linking the workspace */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <svg className="w-full h-full max-w-[90vw] max-h-[50vh] opacity-30" viewBox="0 0 1000 400" fill="none">
          {/* Subtle connecting logic lines */}
          <path d="M100,200 Q300,50 500,200 T900,200" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5" fill="none" />
          <path d="M200,300 Q500,100 800,300" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="0.5" fill="none" />
          
          {/* Active Data Pulses */}
          <circle r="1.5" fill="#3b82f6" className="animate-pulse">
            <animateMotion dur="8s" repeatCount="indefinite" path="M100,200 Q300,50 500,200 T900,200" />
          </circle>
          <circle r="1.5" fill="#06b6d4" className="animate-pulse">
            <animateMotion dur="12s" repeatCount="indefinite" path="M200,300 Q500,100 800,300" />
          </circle>
        </svg>
      </div>

      <div 
        ref={titleRef}
        className="relative z-10 flex flex-col items-center justify-center text-center transition-transform duration-100 ease-out preserve-3d"
        style={{
          transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          willChange: 'transform'
        } as React.CSSProperties}
      >
        <span className="text-[10px] md:text-[12px] tracking-[0.8em] text-[#9aa0a6] uppercase font-light mb-8 block opacity-0 animate-[fade-in-up_1s_ease-out_forwards]">
          Estrategia y Diseño premium
        </span>
        
        <h1 
          className="text-[clamp(6rem,25vw,22rem)] font-bold tracking-tighter leading-none select-none holographic-text relative"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at var(--sx, 50%) var(--sy, 50%),
                rgba(255, 255, 255, 1) 0%,
                rgba(150, 180, 255, 0.4) 20%,
                rgba(100, 100, 110, 0.1) 45%,
                transparent 100%
              ),
              linear-gradient(to bottom, #ffffff 5%, #222222 95%)
            `,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7))'
          } as React.CSSProperties}
        >
          JREX
          
          {/* Internal UI Vector path connecting letters */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 300" style={{ mixBlendMode: 'plus-lighter' }}>
             <path 
                d="M180,150 C250,80 550,80 620,150" 
                stroke="url(#textGradient)" 
                strokeWidth="1.5" 
                fill="none" 
                strokeDasharray="4 8"
                className="opacity-40 animate-[dash_20s_linear_infinite]" 
             />
             <defs>
               <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                 <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                 <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
               </linearGradient>
             </defs>
          </svg>
        </h1>
      </div>

      {/* Connection Flow down to Services */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-[1px] bg-gradient-to-b from-blue-500/40 to-transparent">
        <div className="w-[3px] -left-[1px] absolute top-0 bg-blue-400 blur-[2px] h-full animate-[flow-down_4s_infinite]"></div>
      </div>

      <style>{`
        .holographic-text {
          background-size: 250% 250%;
          transition: background-position 0.15s ease-out;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
        @keyframes flow-down {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Hero;