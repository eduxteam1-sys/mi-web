import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Product';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import Background from './components/Background';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen text-[#e6e6e6] selection:bg-white selection:text-black">
      <Background />
      <Navbar />
      
      {/* Global Vector Connector UI (Strategy in Motion) */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Main flow to WhatsApp */}
          <path 
            d="M 50% 0 L 50% 100% M 50% 80% C 70% 80% 90% 90% calc(100% - 48px) calc(100% - 48px)" 
            stroke="url(#globalGradient)" 
            strokeWidth="0.5" 
            fill="none" 
            strokeDasharray="10 20"
            className="animate-[dash-global_30s_linear_infinite]"
          />
          <defs>
            <linearGradient id="globalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <main className="relative z-10">
        <Hero />
        
        <section id="servicios" className="bg-transparent relative">
          <Services />
        </section>

        <div className="py-20 opacity-10 px-6 max-w-7xl mx-auto">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>

        <section id="reviews" className="bg-transparent">
          <Reviews />
        </section>

        <section id="faq" className="bg-transparent border-t border-[#22262e]/20">
          <FAQ />
        </section>

        <section id="contacto" className="bg-transparent border-t border-[#22262e]/20">
          <Contact />
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />

      <style>{`
        @keyframes dash-global {
          to { stroke-dashoffset: -500; }
        }
      `}</style>
    </div>
  );
};

export default App;