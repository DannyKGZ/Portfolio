import { useEffect } from 'react';
import Background3D from './Background3D';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import Chatbot from './Chatbot';
import SectionSideNum from './SectionSideNum';
import YandexMetrica from './YandexMetrica';
import { useSectionAnalytics } from '@/hooks/useSectionAnalytics';
import { destroySmoothScroll, initSmoothScroll } from '@/lib/scroll';

const Portfolio = () => {
  useSectionAnalytics();

  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <YandexMetrica />
      <Background3D />
      <Navigation />
      <SectionSideNum />
      <main className="section-main">
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
