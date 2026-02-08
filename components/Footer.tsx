import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 bg-transparent px-6 border-t border-[#22262e]/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="text-left">
          <h2 className="text-2xl font-bold tracking-tighter text-white mb-3">JREX STUDIO</h2>
          <p className="text-[10px] text-[#9aa0a6] uppercase tracking-[0.5em] font-light max-w-xs leading-relaxed">
            Estrategia, Diseño y Tecnología de alto rendimiento.
          </p>
        </div>
        
        <div className="flex flex-col md:items-end gap-2">
          <div className="text-[9px] text-[#9aa0a6]/40 uppercase tracking-[0.3em] font-light">
            &copy; {new Date().getFullYear()} JREX STUDIO. All rights reserved.
          </div>
          <div className="text-[9px] text-[#9aa0a6]/40 uppercase tracking-[0.3em] font-light">
            Designed for the future of digital brands.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;