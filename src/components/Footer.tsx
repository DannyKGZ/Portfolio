import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, GithubLogo, GitlabLogo, TelegramLogo } from 'phosphor-react';
import { PROFILE } from '@/constants/profile';
import { scrollToSection, scrollToTop } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current?.children || [], {
        y: 60,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        }
      });

      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, index) => {
          gsap.to(particle, {
            y: -30,
            x: Math.random() * 40 - 20,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.5
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-16 px-6 border-t border-border/30 overflow-hidden">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full blur-sm" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary rounded-full blur-sm" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-accent rounded-full blur-sm" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary rounded-full blur-sm" />
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-secondary rounded-full blur-sm" />
        <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-accent rounded-full blur-sm" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Быстрые ссылки</h4>
            <nav className="space-y-3">
              <button onClick={() => scrollToSection('hero')} className="block text-muted-foreground hover:text-primary-glow transition-colors duration-300">
                Главная
              </button>
              <button onClick={() => scrollToSection('about')} className="block text-muted-foreground hover:text-primary-glow transition-colors duration-300">
                Обо мне
              </button>
              <button onClick={() => scrollToSection('projects')} className="block text-muted-foreground hover:text-primary-glow transition-colors duration-300">
                Проекты
              </button>
              <button onClick={() => scrollToSection('contact')} className="block text-muted-foreground hover:text-primary-glow transition-colors duration-300">
                Контакты
              </button>
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Связаться</h4>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                <span className="text-primary-glow">Почта:</span><br />
                <a href={`mailto:${PROFILE.email}`} className="hover:text-primary-glow transition-colors duration-300">
                  {PROFILE.email}
                </a>
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary-glow">Телефон:</span><br />
                <a href={`tel:${PROFILE.phoneTel}`} className="hover:text-primary-glow transition-colors duration-300">
                  {PROFILE.phone}
                </a>
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary-glow">Местоположение:</span><br />
                {PROFILE.location}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Соцсети</h4>
            <div className="flex flex-wrap gap-3">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center hover:shadow-glow-primary transition-all duration-300 hover:scale-110">
                <GithubLogo size={18} className="text-primary-foreground" />
              </a>
              <a href={PROFILE.gitlab} target="_blank" rel="noopener noreferrer" title="GitLab" className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center hover:shadow-glow-secondary transition-all duration-300 hover:scale-110">
                <GitlabLogo size={18} className="text-secondary-foreground" />
              </a>
              <a href={PROFILE.telegram} target="_blank" rel="noopener noreferrer" title="Telegram" className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center hover:shadow-glow-primary transition-all duration-300 hover:scale-110">
                <TelegramLogo size={18} className="text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} {PROFILE.fullName}. Все права защищены.
          </p>

          <button onClick={scrollToTop} className="px-4 py-2 gap-2 flex items-center bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105 text-sm">
            Наверх <ArrowUp size={18}/>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-primary opacity-10 blur-3xl" />
    </footer>
  );
};

export default Footer;