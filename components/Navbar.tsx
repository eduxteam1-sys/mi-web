
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/60 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-center items-center">
        <a href="#" className="text-3xl font-black font-syncopate tracking-tighter">
          JREX<span className="text-gray-500 text-[10px] tracking-widest ml-1 uppercase">Studio</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
