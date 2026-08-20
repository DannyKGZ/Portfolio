import { Suspense, lazy, useEffect } from 'react';
import Background3D from './Background3D';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import SectionSideNum from './SectionSideNum';
import { useSectionAnalytics } from '@/hooks/useSectionAnalytics';
import { destroySmoothScroll, initSmoothScroll } from '@/lib/scroll';

// Чат-виджет не нужен для первого экрана — грузим отдельным чанком в простое браузера
const Chatbot = lazy(() => import('./Chatbot'));

const Portfolio = () => {
  useSectionAnalytics();

  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Background3D />
      <Navigation />
      <SectionSideNum />
      <main className="section-main">
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
