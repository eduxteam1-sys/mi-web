
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
    // Faster simulation for mobile perception
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen text-[#e6e6e6] selection:bg-white selection:text-black">
      <Background />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <section id="servicios" className="bg-transparent border-y border-[#22262e]/50">
          <Services />
        </section>
        <section id="reviews" className="bg-transparent">
          <Reviews />
        </section>
        <section id="faq" className="bg-transparent border-y border-[#22262e]/50">
          <FAQ />
        </section>
        <section id="contacto" className="bg-transparent">
          <Contact />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;
