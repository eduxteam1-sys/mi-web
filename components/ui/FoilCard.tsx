
import React, { useRef, useEffect } from 'react';

interface FoilCardProps {
  children: React.ReactNode;
  className?: string;
  // Added style property to allow custom CSS properties like transitionDelay from parent
  style?: React.CSSProperties;
}

const FoilCard: React.FC<FoilCardProps> = ({ children, className = "", style = {} }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 50, y: 50, active: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const updateCSS = () => {
      if (card) {
        card.style.setProperty('--x', `${mousePos.current.x}%`);
        card.style.setProperty('--y', `${mousePos.current.y}%`);
        card.style.setProperty('--intensity', `${mousePos.current.active}`);
      }
      rafRef.current = requestAnimationFrame(updateCSS);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mousePos.current = { x, y, active: 1 };
    };

    const handleMouseEnter = () => {
      mousePos.current.active = 1;
    };

    const handleMouseLeave = () => {
      mousePos.current.active = 0;
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    rafRef.current = requestAnimationFrame(updateCSS);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative group overflow-hidden rounded-md border border-[#22262e] bg-[#15181e] ${className}`}
      style={{
        '--x': '50%',
        '--y': '50%',
        '--intensity': '0',
        willChange: 'transform, border-color',
        // Merging external style prop to support animations and other customizations
        ...style
      } as React.CSSProperties}
    >
      {/* Holographic Overlay Layer */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(
              circle at var(--x) var(--y),
              rgba(255, 255, 255, 0.15) 0%,
              rgba(100, 150, 255, 0.05) 25%,
              transparent 50%
            ),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 5px,
              rgba(255, 255, 255, 0.01) 5px,
              rgba(255, 255, 255, 0.01) 10px
            )
          `,
          mixBlendMode: 'color-dodge',
        }}
      />
      
      {/* Subtle Static Shine for Mobile/Inactive state */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      
      <div className="relative z-20">
        {children}
      </div>

      <style>{`
        .foil-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.05), transparent 40%);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default FoilCard;
