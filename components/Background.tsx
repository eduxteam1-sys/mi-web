
import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const fog1Ref = useRef<HTMLDivElement>(null);
  const fog2Ref = useRef<HTMLDivElement>(null);

  // Use refs for animation values to avoid React re-renders for every frame
  const scrollData = useRef({
    current: 0,
    target: 0,
    ease: 0.1,
  });

  useEffect(() => {
    const handleScroll = () => {
      scrollData.current.target = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId: number;

    const render = () => {
      const { current, target, ease } = scrollData.current;
      
      // LERP: Linear Interpolation for smooth motion
      const next = current + (target - current) * ease;
      scrollData.current.current = next;

      if (bgRef.current) {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, next / height));

        // Interpolate colors: #0f1115 -> #15181e -> #1c2128
        // C1: 15, 17, 21 | C2: 21, 24, 30 | C3: 28, 33, 40
        let r, g, b;
        if (progress < 0.5) {
          const p = progress * 2;
          r = 15 + (21 - 15) * p;
          g = 17 + (24 - 17) * p;
          b = 21 + (30 - 21) * p;
        } else {
          const p = (progress - 0.5) * 2;
          r = 21 + (28 - 21) * p;
          g = 24 + (33 - 24) * p;
          b = 30 + (40 - 30) * p;
        }

        bgRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        // Parallax fog effect
        if (fog1Ref.current) {
          fog1Ref.current.style.transform = `translate3d(0, ${-next * 0.1}px, 0)`;
          fog1Ref.current.style.opacity = `${0.3 + progress * 0.2}`;
        }
        if (fog2Ref.current) {
          fog2Ref.current.style.transform = `translate3d(0, ${-next * 0.05}px, 0)`;
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
      className="fixed inset-0 z-[-10] pointer-events-none transition-colors duration-150 ease-linear"
      style={{ backgroundColor: '#0f1115', willChange: 'background-color' }}
    >
      {/* Subtle technological fog elements */}
      <div 
        ref={fog1Ref}
        className="absolute top-[20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-[100px]"
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={fog2Ref}
        className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_60%)] blur-[80px]"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default Background;
