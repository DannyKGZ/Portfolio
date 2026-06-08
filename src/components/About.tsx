import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILE, WORK_EXPERIENCE } from '@/constants/profile';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Архитектура и методологии',
    items: [
      'React + TypeScript — типобезопасность, масштабируемость',
      'Next.js (App Router, SSR, SSG, API routes)',
      'Feature-Sliced Design (FSD) — организация кода в проектах с длительной поддержкой',
      'Компонентный подход, композиция, переиспользуемость',
    ],
  },
  {
    title: 'React-разработка',
    items: [
      'Функциональные компоненты + все хуки (useState, useEffect, useContext, кастомные хуки)',
      'Классовые компоненты (поддержка легаси-кода)',
      'MUI (Material-UI), Styled Components',
      'Framer Motion, React Transition Group, CSS-анимации',
      'Порталы для модальных окон, кастомные хуки состояния',
      'react-hook-form + Zod — валидация форм на клиенте и сервере',
    ],
  },
  {
    title: 'Работа с 1С-Битрикс',
    items: [
      'Разработка на PHP 7.4+ в экосистеме Битрикс',
      'Создание собственных компонентов (включая компонентные классы), вывод свойств инфоблоков и разделов',
      'REST API Битрикса, обработчики событий',
      'Интеграция React-приложений внутрь шаблонов Битрикс (виджеты, админка, публичная часть)',
      'Администрирование (настройка прав, агенты, производительность, композит, кэширование)',
    ],
  },
  {
    title: 'Инструменты и окружение',
    items: [
      'Git — ветвление, pull requests, code review, merge',
      'Docker + Ubuntu — контейнеризация для разработки и тестирования',
      'MacBook в ежедневной работе',
      'Tailwind CSS — быстрая вёрстка лендингов и прототипов',
      'jQuery — только поддержка существующих легаси-проектов',
    ],
  },
  {
    title: 'Вёрстка и дизайн-системы',
    items: [
      'Адаптивная и кроссбраузерная вёрстка (Mobile First / Desktop First)',
      'Pixel Perfect контроль',
      'Работа с макетами: Figma, Photoshop',
      'Опыт интеграции готовых вёрсток в Bitrix и WordPress',
    ],
  },
  {
    title: 'Дополнительно',
    items: [
      'Опыт работы с CMS WordPress (кастомные темы, ACF, хуки)',
      'Активное использование AI-инструментов в разработке: Cursor, DeepSeek',
    ],
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollFrom = (
        targets: gsap.TweenTarget,
        vars: gsap.TweenVars,
        trigger: Element | null,
        start = 'top 85%',
      ) => {
        if (!trigger) return;
        gsap.from(targets, {
          ...vars,
          immediateRender: false,
          scrollTrigger: { trigger, start, once: true },
        });
      };

      scrollFrom(imageRef.current, {
        x: -100, opacity: 0, filter: 'blur(10px)', duration: 1, ease: 'power3.out',
      }, sectionRef.current, 'top 80%');

      scrollFrom(contentRef.current?.children || [], {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      }, contentRef.current, 'top 80%');

      scrollFrom(categoriesRef.current?.children || [], {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      }, categoriesRef.current);

      scrollFrom(extraRef.current?.children || [], {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
      }, extraRef.current);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="snap-section py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div ref={imageRef} className="relative lg:sticky lg:top-28">
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative w-full h-full glass rounded-full p-2 hover:shadow-glow-primary transition-all duration-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-secondary flex items-center justify-center">
                  <span className="text-7xl font-light text-primary-foreground/90 select-none">
                    {PROFILE.initials}
                  </span>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full animate-float" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            </div>
            <div className="mt-6 text-center lg:text-left space-y-1">
              <p className="text-foreground font-medium">{PROFILE.fullName}</p>
              <p className="text-sm text-primary-glow">{PROFILE.title}</p>
              <p className="text-sm text-muted-foreground">{PROFILE.age} лет · {PROFILE.birthDate}</p>
              <p className="text-sm text-muted-foreground">{PROFILE.location}</p>
            </div>
          </div>

          <div ref={contentRef} className="space-y-6">
            <div>
              <p className="text-primary-glow text-sm font-medium mb-3 tracking-wide uppercase">
                {WORK_EXPERIENCE.period} · {WORK_EXPERIENCE.duration}
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
                Обо <span className="text-primary-glow">мне</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-primary rounded-full mb-6" />
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {PROFILE.careerStory}
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Сейчас я {PROFILE.titleShort.toLowerCase()} в {PROFILE.employer} — React, TypeScript, Next.js и 1С-Битрикс.
              От лендингов и мультисайтов до кастомных компонентов CMS и работы с легаси-кодом.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Основная роль — фронтенд: React-виджеты внутри Bitrix и отдельные проекты на Next.js, компонентная архитектура по FSD,
              анимации на Framer Motion, контроль качества вёрстки по макетам Figma. Тяжёлую бизнес-логику на бэкенде проектировал тимлид,
              но когда нужно было ускорить релиз — подключался к PHP-задачам: инфоблоки, свойства элементов, логика через API (Postman).
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Разрабатывал в команде с: TeamLead, Full-Stack Senior Developer, Junior FrontEnd Developer, Designer, Project Manager.
              На каждый из {PROFILE.projectsCount} коммерческих проектов есть доступ в GitLab — при необходимости могу предоставить.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-light text-center text-foreground mb-4">
            Стек и <span className="text-primary-glow">компетенции</span>
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Навыки, которыми пользуюсь в ежедневной разработке
          </p>
          <div ref={categoriesRef} className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category) => (
              <div key={category.title} className="glass p-6 rounded-xl hover:shadow-glow-primary transition-all duration-300">
                <h4 className="text-lg font-medium text-primary-glow mb-4">{category.title}</h4>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary shrink-0 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div ref={extraRef} className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-xl">
            <h4 className="text-lg font-medium text-primary-glow mb-4">Образование</h4>
            <p className="text-foreground font-medium">{PROFILE.education.institution}</p>
            <p className="text-muted-foreground text-sm mt-1">{PROFILE.education.specialty}</p>
            <p className="text-muted-foreground text-sm">{PROFILE.education.year} · {PROFILE.education.level}</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-lg font-medium text-primary-glow mb-4">Занятость и языки</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {PROFILE.employment.map((type) => (
                <span key={type} className="px-3 py-1 bg-primary/10 text-primary-glow text-xs rounded-full border border-primary/20">
                  {type}
                </span>
              ))}
            </div>
            {PROFILE.languages.map((lang) => (
              <p key={lang.name} className="text-sm text-muted-foreground">
                {lang.name} — <span className="text-foreground">{lang.level}</span>
              </p>
            ))}
            <p className="text-sm text-muted-foreground mt-3">
              Гражданство: {PROFILE.citizenship}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default About;
