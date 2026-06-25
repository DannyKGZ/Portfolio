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
    title: 'Интернет-магазин',
    url: 'yuliawave.com',
    items: [
      'Разработка фронтенд-части (React) проекта с реализацией пользовательского интерфейса на основе макетов Figma (Pixel Perfect контроль).',
      'Создание и стилизация UI-компонентов, включая кастомные элементы и компоненты на базе Material-UI (MUI).',
      'Интеграция с REST API.',
      'Организация командной разработки с Git.',
      'Реализация модальных окон, адаптивной и кроссбраузерной вёрстки.',
      'Использование TypeScript для контроля и типизации кода.',
      'Обработка и валидация форм с помощью React Hook Form и Zod.',
      'Оптимизация загрузки и отображения изображений на фронтенде с помощью кастомных компонентов.',
      'Вывод и работа с JSON-файлами для управления контентом и настройками.',
      'Подключение и настройка слайдера Swiper, включая его стилизацию под дизайн проекта.',
      'Взаимодействие с административной частью Bitrix: создание свойств и инфоблоков, наполнение контентом для тестирования вывода данных.',
    ],
    tech: ['React', 'TypeScript', 'MUI', 'React Hook Form', 'Zod', 'Swiper', 'Bitrix', 'REST API', 'Figma', 'JSON'],
    liveUrl: 'https://yuliawave.com',
  },
  {
    id: 2,
    title: 'Автосервис',
    url: 'fta45.ru',
    items: [
      'Разработка и доработка функциональной части сайта на базе Bitrix, включая работу как с стандартными, так и с кастомными компонентами.',
      'Интеграция сервиса Яндекс Карт для отображения местоположения автосервиса, построения маршрутов и визуализации контактной информации.',
      'Реализация интерактивных элементов интерфейса: модальных окон для форм обратной связи и всплывающих сообщений, а также бургер-меню для удобной навигации на мобильных устройствах.',
      'Выполнение адаптивной вёрстки, обеспечивающей корректное отображение сайта на всех типах устройств — от десктопов до смартфонов.',
      'Взаимодействие с REST API.',
      'Работа с дизайн-макетами в Figma и строгий контроль соответствия вёрстки макету с использованием Pixel Perfect.',
      'Соблюдение БЭМ методологии.',
      'Администрирование контентной части Битрикса: создание и настройка инфоблоков, добавление и систематизация пользовательских свойств элементов.',
      'Работа с Docker, WSL2 — запуск контейнеров.',
      'Организация командной разработки с Git.',
    ],
    tech: ['Bitrix', 'BEM', 'Yandex Maps', 'REST API', 'Docker', 'WSL2', 'Figma', 'Git'],
    liveUrl: 'https://fta45.ru',
  },
  {
    id: 3,
    title: 'Сеть интернет-магазинов (3+ сайта)',
    url: 'alpinefloor.su',
    items: [
      'Разработка проекта на React с внедрением дизайн-системы по макетам Figma и жёстким контролем пиксельного соответствия элементов. Обработка графических материалов в Photoshop.',
      'Работа с UI-компонентами, включающей как полностью уникальные кастомные решения, так и надстройки над готовыми компонентами Material-UI.',
      'Организация взаимодействия с бэкендом через REST-запросы с обработкой входящих и исходящих данных и контролем типизации на всех этапах обмена.',
      'Внедрение строгой типизации TypeScript, а также комплексной валидации форм с использованием React Hook Form и Zod с кастомизацией сообщений об ошибках.',
      'Построение гибкой сетки с адаптивной и кроссбраузерной логикой отображения. Реализация модальных окон и табов.',
      'Разработка собственного подхода к работе с графикой: создание обёрток и оптимизация изображений.',
      'Вывод и управление контентом через JSON-файлы для гибкой настройки без правки кода.',
      'Интеграция слайдера Swiper с стилизацией навигации, пагинации и анимаций.',
      'Работа с Яндекс.Картами с отображением точек магазинов, кастомные иконки с выводом модальных окон.',
      'Подключение шрифтов, создание кастомного компонента для спрайтовых SVG-иконок.',
      'Организация командной разработки с Git.',
      'Стилизация текстовых страниц в рамках единой концепции проекта.',
    ],
    tech: ['React', 'TypeScript', 'MUI', 'React Hook Form', 'Zod', 'Swiper', 'Yandex Maps', 'JSON', 'Figma', 'Photoshop', 'SVG'],
    liveUrl: 'https://alpinefloor.su',
  },
  {
    id: 4,
    title: 'Интернет-магазин',
    url: 'bojeni.ru',
    items: [
      'Работа и строгий контроль Perfect Pixel с макетов дизайна Figma.',
      'Создание в административной панели инфоблоков, свойств и настройка интерфейсов вывода данных.',
      'Работа с REST API.',
      'Поддержка светлой и тёмной тем интерфейса.',
      'Кастомизацию SVG-иконок.',
      'Разработка модальных окон и попапов с различными сценариями взаимодействия.',
      'Интегрирование Яндекс Карты с настройкой тёмной темы, кастомизацией меток и выводом адресов внутри модального окна.',
      'Валидация и обработка форм.',
      'Создание кастомных Bitrix компонентов.',
      'Стилизация текстовых страниц в соответствии с макетом.',
      'Обработка JSON-файлов.',
      'Вывод контента через административную панель и возможность скачивания PDF-файлов.',
      'Организация командной разработки с Git.',
      'Соблюдение БЭМ методологии.',
      'Создание и стилизация Swiper слайдера с кастомными стрелками и навигацией.',
    ],
    tech: ['Bitrix', 'BEM', 'Yandex Maps', 'Swiper', 'REST API', 'SVG', 'JSON', 'PDF', 'Figma'],
    liveUrl: 'https://bojeni.ru',
  },
  {
    id: 5,
    title: 'Интернет-магазин',
    url: 'varde-home.ru',
    items: [
      'Реализована Perfect Pixel вёрстка на основе дизайн-макетов Figma.',
      'Работа с Tailwind CSS.',
      'Настройка подключение пользовательских шрифтов.',
      'Разработка кастомных векторных иконок в формате SVG.',
      'Интеграция слайдера Swiper с полной переработкой дизайна стандартных элементов управления (кастомизация стрелок и пагинаций).',
      'Сверстаны и стилизованы текстовые страницы с типографической иерархией.',
      'Реализован функционал модальных окон и попапов.',
      'Организация командной разработки с Git.',
    ],
    tech: ['Tailwind CSS', 'Swiper', 'SVG', 'Figma', 'Git'],
    liveUrl: 'https://varde-home.ru',
  },
  {
    id: 6,
    title: 'Интернет-магазин',
    url: 'medstandart-market.ru',
    items: [
      'Работа и вёрстка по макету Figma.',
      'Разработка пользовательской части сайта с созданием уникальных шаблонов компонентов, обеспечивающих Pixel Perfect соответствие дизайн-макетам.',
      'Написание собственных компонентов Bitrix для нестандартных выводов каталога, элементов инфоблоков и разделов.',
      'Полное администрирование контентной части: самостоятельное наполнение сайта товарами, услугами и информационными материалами через административный интерфейс.',
      'Настройка инфоблоков, создание пользовательских свойств и настройка параметров вывода для корректного отображения контента.',
      'Вёрстка адаптивных и кроссбраузерных интерфейсов с учётом особенностей шаблонизатора Bitrix и управлением состоянием элементов через встроенные средства CMS.',
      'Организация командной разработки с Git.',
      'Настройка и работа с Docker-окружением — сборка контейнеров разработки и развёртывание.',
    ],
    tech: ['Bitrix', 'Docker', 'Figma', 'Git', 'Адаптив'],
    liveUrl: 'https://medstandart-market.ru',
  },
  {
    id: 7,
    title: 'Интернет-магазин',
    url: 'gnature.ru',
    items: [
      'Адаптация старых шаблонов под новый дизайн-макет, обеспечив кроссбраузерность и адаптивную вёрстку.',
      'Создание и переиспользование компонентов.',
      'Внедрение кастомных блоков для измения текстов, заголовки и баннеры в режиме реального времени, не редактируя файлы сайта.',
      'Работа с легаси-кодом.',
    ],
    tech: ['Bitrix', 'Bootstrap', 'PHP', 'Легаси', 'Адаптив'],
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
