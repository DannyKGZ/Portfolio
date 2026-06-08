import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';
import { scrollToSection } from '@/lib/scroll';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      });

      gsap.from(mobileMenuRef.current?.querySelectorAll('.menu-item') || [], {
        x: 40,
        duration: 0.35,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.15,
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.out',
      });
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
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary-glow cursor-pointer">
                Портфолио
              </h2>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => goToSection(item.id)} className="text-foreground/80 hover:text-primary-glow transition-colors duration-300 font-light">
                  {item.name}
                </button>
              ))}

              <button onClick={() => goToSection('contact')} className="px-6 py-2 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105">
                Связаться со мной
              </button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground p-2">
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      <div ref={mobileMenuRef} className="fixed top-0 right-0 w-full h-full bg-background/95 backdrop-blur-lg z-50 transform translate-x-full md:hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-light text-primary-glow">Портфолио</h2>
          <button onClick={() => setIsOpen(false)} className="text-foreground p-2">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col space-y-6 p-6 mt-8">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => goToSection(item.id)} className="menu-item text-left text-xl text-foreground/80 hover:text-primary-glow transition-colors duration-300">
              {item.name}
            </button>
          ))}

          <button onClick={() => goToSection('contact')} className="menu-item px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-glow-primary transition-all duration-300 text-center mt-8">
            Связаться со мной
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
