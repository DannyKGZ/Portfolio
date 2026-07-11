import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILE, WORK_EXPERIENCE } from '@/constants/profile';

gsap.registerPlugin(ScrollTrigger);

const STACK_INTRO =
  'Фронтенд на React и TypeScript: компонентная архитектура, вёрстка по Figma, формы, API, e-commerce и корпоративные сайты на 1С-Битрикс.';

const skillCategories = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'JavaScript (ES6+)', 'SSR / CSR — серверный и клиентский рендеринг'],
  },
  {
    title: 'UI и вёрстка',
    items: [
      'Styled Components, CSS Modules',
      'Sass, Less, Bootstrap',
      'БЭМ, адаптив, кроссбраузерность',
    ],
  },
  {
    title: 'Дизайн и UI-системы',
    items: [
      'Работа с Figma — макеты, компоненты, передача в вёрстку',
      'Tailwind CSS, Material UI, Shadcn/UI',
      'Понимание принципов UX-дизайна',
    ],
  },
  {
    title: 'Формы и данные',
    items: [
      'React Hook Form + Zod',
      'REST API — интеграция и типизация',
      'JSON-конфиги для контента',
      'Работа с CSV-файлами',
    ],
  },
  {
    title: 'CMS и интеграции',
    items: [
      '1С-Битрикс — компоненты, инфоблоки, React-виджеты',
      'WordPress — CMS',
      'Яндекс.Карты, Google Maps, 2GIS, Google API',
      'Swiper, SVG-спрайты',
    ],
  },
  {
    title: 'Инструменты',
    items: [
      'Git, Docker / WSL2, Vite, Webpack, Postman',
      'Cursor, DeepSeek, Claude',
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
    <section id="about" ref={sectionRef} className="py-24">
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
              <p className="text-sm text-muted-foreground">{PROFILE.age} лет · {PROFILE.location}</p>
              <p className="text-sm text-muted-foreground">{PROFILE.relocation} · {PROFILE.businessTrips.toLowerCase()}</p>
            </div>
          </div>

          <div ref={contentRef} className="lg:col-span-8 space-y-5">
            <p className="text-lg text-muted-foreground leading-relaxed">{PROFILE.careerStory}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Сейчас — {PROFILE.titleShort.toLowerCase()} в {PROFILE.employer} ({WORK_EXPERIENCE.period}).
              React-виджеты в Bitrix, отдельные проекты на Next.js с SSR и CSR, компонентная архитектура по FSD.
              Подключался к PHP-задачам, когда нужно было ускорить релиз: инфоблоки, свойства, API.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Команда: тимлид, senior full-stack, frontend разработчик, дизайнер, PM.
              {PROFILE.projectsCount} коммерческих проектов в продакшене — код и доступ к репозиториям по запросу.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Работа с Figma: читаю макеты, сверяю вёрстку, общаюсь с дизайнером на одном языке.
              UI-библиотеки — Tailwind CSS, Material UI, Shadcn/UI.
              Понимаю принципы UX-дизайна: иерархия, отступы, состояния элементов, удобство на мобильных.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Активно использую AI-инструменты — Cursor, DeepSeek и Claude: ускоряю разработку,
              рефакторинг, генерацию boilerplate и разбор чужого кода. Всегда проверяю результат и пишу финальный код сам.
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
            <h4 className="font-semibold mb-3">Занятость</h4>
            <div className="flex flex-wrap gap-2">
              {PROFILE.employment.map((type) => (
                <span key={type} className="tag">{type}</span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Русский — родной
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
