
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

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-[#050505] bg-[radial-gradient(circle_at_50%_0%,_#1a1a1a_0%,_#050505_70%)] min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <section id="servicios">
          <Services />
        </section>
        <section id="reviews">
          <Reviews />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <section id="contacto">
          <Contact />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;
