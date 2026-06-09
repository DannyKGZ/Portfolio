import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, GithubLogo, GitlabLogo, TelegramLogo } from 'phosphor-react';
import { PROFILE } from '@/constants/profile';
import { scrollToSection, scrollToTop } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current?.children || [], {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-border py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Быстрые ссылки</h4>
            <nav className="space-y-2">
              {[
                { label: 'Главная', id: 'hero' },
                { label: 'Обо мне', id: 'about' },
                { label: 'Проекты', id: 'projects' },
                { label: 'Контакты', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Связаться</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="text-foreground font-medium">Почта:</span><br />
                <a href={`mailto:${PROFILE.email}`} className="hover:text-primary transition-colors">
                  {PROFILE.email}
                </a>
              </p>
              <p>
                <span className="text-foreground font-medium">Телефон:</span><br />
                <a href={`tel:${PROFILE.phoneTel}`} className="hover:text-primary transition-colors">
                  {PROFILE.phone}
                </a>
              </p>
              <p>
                <span className="text-foreground font-medium">Местоположение:</span><br />
                {PROFILE.location}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Соцсети</h4>
            <div className="flex gap-2">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <GithubLogo size={18} />
              </a>
              <a
                href={PROFILE.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                title="GitLab"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <GitlabLogo size={18} />
              </a>
              <a
                href={PROFILE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <TelegramLogo size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="divider pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {PROFILE.fullName}. Все права защищены.
          </p>
          <button onClick={scrollToTop} className="btn-outline text-sm py-2 px-4">
            Наверх <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
