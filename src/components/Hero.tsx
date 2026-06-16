import { ArrowRight, DownloadSimple, Handshake } from 'phosphor-react';
import { PROFILE } from '@/constants/profile';
import { scrollToSection } from '@/lib/scroll';
import MatrixRain from './MatrixRain';
import HeroCoderScene from './HeroCoderScene';
import TechStackIcons from './TechStackIcons';

const Hero = () => {
  const scrollToProjects = () => scrollToSection('projects');
  const scrollToContact = () => scrollToSection('contact');

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = PROFILE.resumePath;
    link.download = PROFILE.resumeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="hero-matrix-bg absolute inset-0 pointer-events-none">
        <MatrixRain />
        <div className="hero-matrix-fade" />
        <HeroCoderScene />
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-4xl">
            <p className="section-label mb-6">{PROFILE.portfolioTagline}</p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
              {PROFILE.lastName} {PROFILE.firstName}
              <span className="text-primary">.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl mb-10">
              {PROFILE.title}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <button onClick={scrollToContact} className="btn-primary">
                <Handshake size={18} />
                Связаться со мной
              </button>
              <button onClick={downloadCV} className="btn-outline">
                <DownloadSimple size={18} />
                Скачать резюме
              </button>
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
