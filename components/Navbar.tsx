import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0f1115]/95 border-b border-[#22262e] py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">
          JREX STUDIO
        </a>
        <div className="text-[10px] tracking-[0.3em] text-[#9aa0a6] uppercase font-light hidden sm:block">
          Design & Advertising
        </div>
      </div>
    </nav>
  );
};

export default Navbar;