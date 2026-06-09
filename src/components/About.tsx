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
      'MUI (Material-UI), Styled Components, sliders-swiper',
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
      'Перешел на MacBook для облегчения разработки',
      'Опыт работы с CMS Bitrix',
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

      scrollFrom(imageRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, sectionRef.current, 'top 80%');
      scrollFrom(contentRef.current?.children || [], { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, contentRef.current, 'top 80%');
      scrollFrom(categoriesRef.current?.children || [], { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, categoriesRef.current);
      scrollFrom(extraRef.current?.children || [], { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, extraRef.current);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-start justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Обо мне<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="section-num hidden md:block">02</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div ref={imageRef} className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="w-48 h-48 border-2 border-foreground flex items-center justify-center bg-muted">
              <span className="text-6xl font-bold text-foreground select-none">{PROFILE.initials}</span>
            </div>
            <div className="mt-6 space-y-1">
              <p className="font-semibold text-lg">{PROFILE.fullName}</p>
              <p className="text-sm text-primary font-medium">{PROFILE.title}</p>
              <p className="text-sm text-muted-foreground">{PROFILE.age} лет · {PROFILE.birthDate}</p>
              <p className="text-sm text-muted-foreground">{PROFILE.location}</p>
            </div>
          </div>

          <div ref={contentRef} className="lg:col-span-8 space-y-5">
            <p className="text-lg text-muted-foreground leading-relaxed">{PROFILE.careerStory}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Сейчас я {PROFILE.titleShort.toLowerCase()} в небольшой команде — React, TypeScript, Next.js и 1С-Битрикс.
              От лендингов и мультисайтов до кастомных компонентов CMS и работы с легаси-кодом.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Основная роль — фронтенд: React-виджеты внутри Bitrix и отдельные проекты на Next.js, компонентная архитектура по FSD,
              контроль качества вёрстки по макетам Figma. Тяжёлую бизнес-логику на бэкенде проектировал тимлид,
              но когда нужно было ускорить релиз — подключался к PHP-задачам: инфоблоки, свойства элементов, логика через API (Postman).
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Разрабатывал в команде с: TeamLead, Full-Stack Senior Developer, Junior FrontEnd Developer, Designer, Project Manager.
              На каждый из {PROFILE.projectsCount} коммерческих проектов есть доступ в GitLab — при необходимости могу предоставить.
            </p>
          </div>
        </div>

        <div className="divider my-20" />

        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Стек и компетенции<span className="text-primary">.</span>
          </h3>
          <p className="text-muted-foreground">Навыки, которыми пользуюсь в ежедневной разработке</p>
        </div>

        <div ref={categoriesRef} className="grid md:grid-cols-2 gap-4">
          {skillCategories.map((category, i) => (
            <div key={category.title} className="card-flat">
              <div className="flex items-start gap-4">
                <span className="text-xs font-bold text-primary mt-1">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1">
                  <h4 className="font-semibold mb-3">{category.title}</h4>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground leading-relaxed pl-3 border-l-2 border-border">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={extraRef} className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="card-flat">
            <h4 className="font-semibold mb-3">Образование</h4>
            <p className="font-medium">{PROFILE.education.institution}</p>
            <p className="text-muted-foreground text-sm mt-1">{PROFILE.education.specialty}</p>
            <p className="text-muted-foreground text-sm">{PROFILE.education.year} · {PROFILE.education.level}</p>
          </div>
          <div className="card-flat">
            <h4 className="font-semibold mb-3">Занятость и языки</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {PROFILE.employment.map((type) => (
                <span key={type} className="tag">{type}</span>
              ))}
            </div>
            {PROFILE.languages.map((lang) => (
              <p key={lang.name} className="text-sm text-muted-foreground">
                {lang.name} — <span className="text-foreground font-medium">{lang.level}</span>
              </p>
            ))}
            <p className="text-sm text-muted-foreground mt-3">Гражданство: {PROFILE.citizenship}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
