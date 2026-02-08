import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#0f1115] px-6 border-t border-[#22262e]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold tracking-tight text-white mb-1">JREX STUDIO</h2>
          <p className="text-[10px] text-[#9aa0a6] uppercase tracking-[0.3em] font-light">Minimalist Design & Strategic Advertising</p>
        </div>
        <div className="text-[10px] text-[#9aa0a6] uppercase tracking-[0.2em] font-medium">
          &copy; {new Date().getFullYear()} JREX CREATIVE.
        </div>
      </div>
    </footer>
  );
};

export default Footer;