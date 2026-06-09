import { ArrowRight, DownloadSimple, Handshake } from 'phosphor-react';
import { PROFILE } from '@/constants/profile';
import { scrollToSection } from '@/lib/scroll';

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-accent/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-primary-glow text-sm font-medium mb-4 tracking-wide uppercase">
          {PROFILE.portfolioTagline}
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 leading-tight">
          Привет! Я{' '}
          <span className="text-primary-glow">{PROFILE.displayName}</span>
          {' '}—{' '}
          <br className="hidden md:block" />
          <span className="text-primary-glow">{PROFILE.title}</span>
        </h1>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={scrollToContact} className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow-primary transition-all duration-300 hover:scale-105">
            <Handshake size={20} />
            Связаться со мной
          </button>
          <button onClick={downloadCV} className="group inline-flex items-center gap-3 px-8 py-4 border border-primary/30 text-primary hover:bg-primary/10 rounded-lg font-medium transition-all duration-300 hover:scale-105">
            <DownloadSimple size={20} />
            Скачать резюме
          </button>
          <button onClick={scrollToProjects} className="group inline-flex items-center gap-3 px-8 py-4 text-foreground hover:bg-primary/10 rounded-lg font-medium transition-all duration-300 hover:scale-105">
            Мои работы
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
