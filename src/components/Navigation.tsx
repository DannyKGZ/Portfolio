import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';
import { scrollToSection } from '@/lib/scroll';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, { x: 0, duration: 0.35, ease: 'power2.out' });
    } else {
      gsap.to(mobileMenuRef.current, { x: '100%', duration: 0.35, ease: 'power2.out' });
    }
  }, [isOpen]);

  const goToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Главная', id: 'hero' },
    { name: 'Обо мне', id: 'about' },
    { name: 'Проекты', id: 'projects' },
    { name: 'Контакты', id: 'contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => goToSection('hero')} className="text-lg font-bold tracking-tight font-[Space_Grotesk]">
              РР<span className="text-primary">.</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => goToSection(item.id)} className="nav-link">
                  {item.name}
                </button>
              ))}
              <button onClick={() => goToSection('contact')} className="btn-primary text-sm py-2 px-4">
                Связаться
              </button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-foreground" aria-label="Меню">
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 w-full h-full bg-background z-50 transform translate-x-full md:hidden border-l border-border"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="text-lg font-bold font-[Space_Grotesk]">РР<span className="text-primary">.</span></span>
          <button onClick={() => setIsOpen(false)} className="p-2" aria-label="Закрыть">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-6 gap-6 mt-4">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => goToSection(item.id)} className="text-2xl font-bold text-left font-[Space_Grotesk] hover:text-primary transition-colors">
              {item.name}
            </button>
          ))}
          <button onClick={() => goToSection('contact')} className="btn-primary mt-4 justify-center">
            Связаться со мной
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
