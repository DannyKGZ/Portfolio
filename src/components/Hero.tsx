import { ArrowRight, Handshake } from '@/components/icons';
import { PROFILE } from '@/constants/profile';
import { scrollToSection } from '@/lib/scroll';
import MatrixRain from './MatrixRain';
import HeroCoderScene from './HeroCoderScene';
import TechStackIcons from './TechStackIcons';
import DownloadResumeButton from './DownloadResumeButton';

const Hero = () => {
  const scrollToProjects = () => scrollToSection('projects');
  const scrollToContact = () => scrollToSection('contact');

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="hero-matrix-bg absolute inset-0 pointer-events-none">
        <MatrixRain />
        <div className="hero-matrix-fade" />
        <HeroCoderScene />
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-4xl">
          <p className="section-label mb-6">{PROFILE.heroBadge}</p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
            {PROFILE.lastName} {PROFILE.firstName}
            <span className="text-primary">.</span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground font-medium max-w-2xl mb-4">
            {PROFILE.title} — React, TypeScript, Next.js
          </p>

          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mb-10 leading-relaxed">
            {PROFILE.heroSummary}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <button onClick={scrollToContact} className="btn-primary">
              <Handshake size={18} />
              Связаться со мной
            </button>
            <DownloadResumeButton />
            <button onClick={scrollToProjects} className="btn-ghost">
              Мои работы
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="divider mt-20" />
        <div className="mt-10 pb-8">
          <TechStackIcons />
        </div>
      </div>
    </section>
  );
};

export default Hero;
