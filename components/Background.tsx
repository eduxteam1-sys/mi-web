
import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const fog1Ref = useRef<HTMLDivElement>(null);
  const fog2Ref = useRef<HTMLDivElement>(null);

  const scrollData = useRef({
    current: 0,
    target: 0,
    ease: 0.08,
  });

  useEffect(() => {
    const handleScroll = () => {
      scrollData.current.target = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId: number;

    const render = () => {
      const { current, target, ease } = scrollData.current;
      const next = current + (target - current) * ease;
      scrollData.current.current = next;

      if (bgRef.current) {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, next / (height || 1)));

        // Interpolate colors: Editorial Charcoal -> Deep Graphite -> Dark Slate
        // C1: 10, 11, 13 (Charcoal) | C2: 15, 17, 21 | C3: 18, 20, 24
        let r, g, b;
        if (progress < 0.5) {
          const p = progress * 2;
          r = 10 + (15 - 10) * p;
          g = 11 + (17 - 11) * p;
          b = 13 + (21 - 13) * p;
        } else {
          const p = (progress - 0.5) * 2;
          r = 15 + (18 - 15) * p;
          g = 17 + (20 - 17) * p;
          b = 21 + (24 - 21) * p;
        }

        bgRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        if (fog1Ref.current) {
          fog1Ref.current.style.transform = `translate3d(0, ${-next * 0.12}px, 0)`;
          fog1Ref.current.style.opacity = `${0.2 + progress * 0.15}`;
        }
        if (fog2Ref.current) {
          fog2Ref.current.style.transform = `translate3d(0, ${-next * 0.08}px, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={bgRef}
      className="fixed inset-0 z-[-10] pointer-events-none"
      style={{ backgroundColor: '#0a0b0d', willChange: 'background-color' }}
    >
      {/* Editorial Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Atmospheric Fog */}
      <div 
        ref={fog1Ref}
        className="absolute top-[15%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_75%)] blur-[120px]"
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={fog2Ref}
        className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(100,120,255,0.015)_0%,transparent_65%)] blur-[100px]"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default Background;
