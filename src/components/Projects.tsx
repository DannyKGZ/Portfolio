import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'phosphor-react';
import { WORK_EXPERIENCE } from '@/constants/profile';
import { trackGoal } from '@/lib/analytics';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Yulia Wave — интернет-магазин косметики',
    url: 'yuliawave.com',
    items: [
      'React + TypeScript: каталог, корзина, модалки — вёрстка по макетам Figma.',
      'Формы с React Hook Form и Zod, интеграция REST API, оптимизация изображений.',
      'React-виджеты в Bitrix: инфоблоки, свойства, вывод контента из админки.',
    ],
    tech: ['React', 'TypeScript', 'MUI', 'Bitrix', 'REST API', 'Figma'],
    liveUrl: 'https://yuliawave.com',
  },
  {
    id: 2,
    title: 'FTA45 — сайт автосервиса',
    url: 'fta45.ru',
    items: [
      'Bitrix: кастомные компоненты, бургер-меню, модальные формы обратной связи.',
      'Яндекс.Карты: маршруты, метки, контактная информация на карте.',
      'Адаптивная вёрстка по Figma, локальная разработка в Docker / WSL2.',
    ],
    tech: ['Bitrix', 'BEM', 'Yandex Maps', 'Docker', 'Figma'],
    liveUrl: 'https://fta45.ru',
  },
  {
    id: 3,
    title: 'Alpine Floor — сеть из 3+ магазинов',
    url: 'alpinefloor.su',
    items: [
      'React + MUI: единая дизайн-система для нескольких доменов, табы и модалки.',
      'Карта магазинов на Яндекс.Картах, Swiper, JSON-конфиг для контента без правки кода.',
      'TypeScript, валидация форм, кастомные обёртки для графики.',
    ],
    tech: ['React', 'TypeScript', 'MUI', 'Swiper', 'Yandex Maps', 'JSON'],
    liveUrl: 'https://alpinefloor.su',
  },
  {
    id: 4,
    title: 'Bojeni — интернет-магазин с тёмной темой',
    url: 'bojeni.ru',
    items: [
      'Bitrix: кастомные компоненты, светлая и тёмная тема интерфейса.',
      'Яндекс.Карты в модалках, SVG-иконки, выгрузка PDF из каталога.',
      'Swiper, REST API, настройка инфоблоков и свойств в админке.',
    ],
    tech: ['Bitrix', 'Yandex Maps', 'Swiper', 'REST API', 'SVG', 'Figma'],
    liveUrl: 'https://bojeni.ru',
  },
  {
    id: 5,
    title: 'Varde Home — магазин товаров для дома',
    url: 'varde-home.ru',
    items: [
      'Tailwind CSS: pixel-perfect вёрстка по Figma, кастомные шрифты.',
      'Полностью переработанный Swiper: стрелки, пагинация, анимации.',
      'SVG-иконки, типографика текстовых страниц, модальные окна.',
    ],
    tech: ['Tailwind CSS', 'Swiper', 'SVG', 'Figma'],
    liveUrl: 'https://varde-home.ru',
  },
  {
    id: 6,
    title: 'MedStandart — медицинский маркетплейс',
    url: 'medstandart-market.ru',
    items: [
      'Bitrix: кастомный каталог, шаблоны для нестандартных выводов товаров.',
      'Самостоятельное наполнение контента через админку: товары, услуги, статьи.',
      'Docker-окружение для сборки и развёртывания, адаптивная вёрстка.',
    ],
    tech: ['Bitrix', 'Docker', 'Figma', 'Адаптив'],
    liveUrl: 'https://medstandart-market.ru',
  },
  {
    id: 7,
    title: 'G.Nature — редизайн легаси-сайта',
    url: 'gnature.ru',
    items: [
      'Адаптация старых Bitrix-шаблонов под новый дизайн без полного переписывания.',
      'Переиспользуемые компоненты, кроссбраузерная и адаптивная вёрстка.',
      'Кастомные блоки для текстов и баннеров — правки без деплоя.',
    ],
    tech: ['Bitrix', 'Bootstrap', 'PHP', 'Легаси'],
    liveUrl: 'https://gnature.ru',
  },
];

const ProjectItems = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="text-sm text-muted-foreground leading-relaxed pl-3 border-l-2 border-border">
        {item}
      </li>
    ))}
  </ul>
);

const trackProjectClick = (url: string, title: string) => {
  trackGoal('project_click', { url, title });
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
      });
      gsap.from(containerRef.current?.children || [], {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: containerRef.current, start: 'top 82%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-muted/30">
      <div className="container">
        <div ref={titleRef} className="mb-16">
          <p className="section-label mb-3">{WORK_EXPERIENCE.period}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Мои работы<span className="text-primary">.</span>
          </h2>
        </div>

        <div ref={containerRef} className="space-y-4">
          {projects.map((project) => (
            <article key={project.id} className="card-flat group">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="lg:w-16 shrink-0">
                  <span className="text-3xl font-bold text-border group-hover:text-primary transition-colors duration-200">
                    {String(project.id).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h3>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => trackProjectClick(project.url, project.title)}
                      >
                        {project.url}
                      </a>
                    </div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline shrink-0"
                      onClick={() => trackProjectClick(project.url, project.title)}
                    >
                      Смотреть проект
                      <ArrowUpRight size={16} />
                    </a>
                  </div>

                  <div className="mb-4">
                    <ProjectItems items={project.items} />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
