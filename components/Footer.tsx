
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-transparent px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-black font-syncopate tracking-widest mb-1">JREX</h2>
          <p className="text-[9px] text-gray-500 uppercase tracking-[0.4em]">Diseño Disruptivo. Publicidad Memorable.</p>
        </div>

        <div className="text-[10px] text-gray-700 uppercase tracking-widest font-medium text-center">
          &copy; {new Date().getFullYear()} JREX CREATIVE STUDIO. TODOS LOS DERECHOS RESERVADOS.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
