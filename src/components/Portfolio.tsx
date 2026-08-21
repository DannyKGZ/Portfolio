import { Suspense, lazy, useEffect } from 'react';
import Background3D from './Background3D';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Footer from './Footer';
import SectionSideNum from './SectionSideNum';
import { useSectionAnalytics } from '@/hooks/useSectionAnalytics';
import { destroySmoothScroll, initSmoothScroll } from '@/lib/scroll';

// Форма контактов тянет за собой zod и react-hook-form (~95 КБ) и находится
// внизу страницы — в стартовом бандле ей делать нечего.
const Contact = lazy(() => import('./Contact'));
// Чат-виджет не нужен для первого экрана
const Chatbot = lazy(() => import('./Chatbot'));

/** Заглушка держит высоту и якорь #contact, пока грузится чанк формы */
const ContactPlaceholder = () => <section id="contact" className="py-24 min-h-[720px]" aria-hidden />;

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
        <Suspense fallback={<ContactPlaceholder />}>
          <Contact />
        </Suspense>
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
