
import React from 'react';

const Services: React.FC = () => {
  const features = [
    { title: 'Branding', desc: 'Identidades visuales que perduran en el tiempo' },
    { title: 'Publicidad', desc: 'Campañas de alto impacto emocional' },
    { title: 'Digital', desc: 'Experiencias web inmersivas y fluidas' },
    { title: 'Estrategia', desc: 'Análisis de mercado y posicionamiento premium' },
  ];

  return (
    <div className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full transition-all group-hover:bg-white/10"></div>
            <img 
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800" 
              alt="Design Process" 
              className="relative z-10 w-full h-auto rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-[1.02]"
            />
          </div>
          
          <div>
            <span className="text-xs tracking-[0.5em] text-gray-500 uppercase mb-4 block">Artesanía Digital</span>
            <h2 className="text-5xl md:text-7xl font-bold font-syncopate mb-12 tracking-tighter uppercase">Servicios</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">
              No solo diseñamos imágenes; construimos narrativas visuales. Cada píxel es una decisión estratégica destinada a elevar el valor percibido de su marca.
            </p>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {features.map((f) => (
                <div key={f.title} className="group cursor-default">
                  <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2 group-hover:text-gray-400 transition-colors">{f.title}</h3>
                  <p className="text-gray-500 text-xs tracking-wider">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
