import { useState, useEffect } from 'react';
import Preloader from './Preloader';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import Chatbot from './Chatbot';
import { destroySmoothScroll, initSmoothScroll, pauseSmoothScroll, resumeSmoothScroll } from '@/lib/scroll';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      pauseSmoothScroll();
    } else {
      document.body.style.overflow = '';
      resumeSmoothScroll();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      initSmoothScroll();
    }
    return () => destroySmoothScroll();
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative overflow-x-hidden">
      {isLoading && <Preloader onComplete={handleLoadingComplete} />}
      
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Chatbot/>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;