import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Envelope, Phone, MapPin, ChatCircle, GithubLogo, GitlabLogo, TelegramLogo } from 'phosphor-react';
import { PROFILE, WORK_EXPERIENCE } from '@/constants/profile';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollFrom = (
        targets: gsap.TweenTarget,
        vars: gsap.TweenVars,
        trigger: Element | null,
      ) => {
        if (!trigger) return;
        gsap.from(targets, {
          ...vars,
          immediateRender: false,
          scrollTrigger: { trigger, start: 'top 80%', once: true },
        });
      };

      scrollFrom(titleRef.current?.children || [], {
        y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
      }, titleRef.current);
      scrollFrom(infoRef.current?.children || [], {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      }, infoRef.current);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const messengers = [
    { label: 'WhatsApp', href: PROFILE.whatsapp },
    { label: 'Viber', href: PROFILE.viber },
    { label: `Telegram ${PROFILE.telegramHandle}`, href: PROFILE.telegram },
  ];

  return (
    <section id="contact" ref={sectionRef} className="snap-section py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-3xl">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Связаться <span className="text-primary-glow">со мной</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Предпочтительная связь — почта или мессенджеры. Открыт к полной, частичной и проектной занятости.
          </p>
        </div>

        <div ref={infoRef} className="space-y-8">
          <p className="text-muted-foreground leading-relaxed text-center">
            {PROFILE.title} с {WORK_EXPERIENCE.duration} опыта в {PROFILE.employer}.
            React, TypeScript, 1С-Битрикс — лендинги, мультисайты, кастомные компоненты CMS.
            {PROFILE.relocation}, {PROFILE.businessTrips.toLowerCase()}.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 glass rounded-lg hover:shadow-glow-primary transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0">
                <Envelope size={20} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-foreground font-medium">Почта · предпочтительно</p>
                <a href={`mailto:${PROFILE.email}`} className="text-muted-foreground hover:text-primary-glow transition-colors duration-300">
                  {PROFILE.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 glass rounded-lg hover:shadow-glow-secondary transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center shrink-0">
                <Phone size={20} className="text-secondary-foreground" />
              </div>
              <div>
                <p className="text-foreground font-medium">Телефон</p>
                <a href={`tel:${PROFILE.phoneTel}`} className="text-muted-foreground hover:text-primary-glow transition-colors duration-300">
                  {PROFILE.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 glass rounded-lg hover:shadow-glow-primary transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-foreground font-medium">Местоположение</p>
                <p className="text-muted-foreground">{PROFILE.location}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Мессенджеры</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {messengers.map((m) => (
                <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105 text-sm text-foreground">
                  <ChatCircle size={18} className="text-primary-glow" />
                  {m.label}
                </a>
              ))}
            </div>

            <h4 className="text-lg font-medium text-foreground mb-4">Профили</h4>
            <div className="flex flex-wrap gap-3">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105 text-sm text-foreground">
                <GithubLogo size={18} className="text-primary-glow" />
                GitHub
              </a>
              <a href={PROFILE.gitlab} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105 text-sm text-foreground">
                <GitlabLogo size={18} className="text-secondary-glow" />
                GitLab
              </a>
              <a href={PROFILE.telegram} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105 text-sm text-foreground">
                <TelegramLogo size={18} className="text-accent-glow" />
                {PROFILE.telegramHandle}
              </a>
              <a href={PROFILE.hh} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105 text-sm text-foreground">
                HH.ru
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default Contact;
