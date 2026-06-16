import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILE } from '@/constants/profile';

gsap.registerPlugin(ScrollTrigger);

const STACK_INTRO =
  'Специализируюсь на создании сложных пользовательских интерфейсов с соблюдением дизайна (Pixel Perfect) по макетам Figma и Photoshop. Разрабатываю и поддерживаю проекты от лендингов до интернет-магазинов, обеспечивая высокую скорость загрузки, адаптивность и кроссбраузерную совместимость.';

const skillCategories = [
  {
    title: 'Основной стек',
    items: ['React', 'TypeScript', 'JavaScript (ES6+)'],
  },
  {
    title: 'Стилизация',
    items: [
      'Material-UI (MUI)',
      'Tailwind CSS',
      'Styled Components',
      'CSS Modules',
      'БЭМ-методология',
    ],
  },
  {
    title: 'Управление формами',
    items: ['React Hook Form', 'Zod — валидация и кастомизация ошибок'],
  },
  {
    title: 'Графика и анимация',
    items: [
      'Swiper — кастомизация слайдеров',
      'Яндекс.Карты и 2GIS — кастомизация меток, построение маршрутов',
      'Спрайтовые SVG-иконки',
      'Оптимизация изображений',
    ],
  },
  {
    title: 'Работа с данными',
    items: [
      'REST API — интеграция, обработка запросов, типизация',
      'Управление контентом через JSON-файлы',
    ],
  },
  {
    title: 'CMS и Backend',
    items: [
      '1С-Битрикс — инфоблоки, свойства, кастомные компоненты и шаблоны, администрирование',
      'WordPress',
    ],
  },
  {
    title: 'Инфраструктура',
    items: [
      'Git — pull, commit, branch, merge',
      'Docker / WSL2 — настройка окружения, сборка контейнеров',
      'Webpack',
    ],
  },
  {
    title: 'Дополнительно',
    items: ['AI-агенты Cursor и DeepSeek', 'MCP — Figma'],
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
      <div className="container">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Обо мне<span className="text-primary">.</span>
          </h2>
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
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{STACK_INTRO}</p>
        </div>

        <div ref={categoriesRef} className="grid md:grid-cols-3 gap-4">
          {skillCategories.map((category, i) => (
            <div key={category.title} className="card-flat relative overflow-hidden">
              <span className="skill-card-num" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative z-10">
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
