import { useEffect } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import Chatbot from './Chatbot';
import { destroySmoothScroll, initSmoothScroll } from '@/lib/scroll';

const Portfolio = () => {
  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
