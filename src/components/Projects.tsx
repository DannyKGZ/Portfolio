import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Globe } from 'phosphor-react';
import { WORK_EXPERIENCE } from '@/constants/profile';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Творческий сайт (React + Bitrix)',
    url: 'yuliawave.com',
    task: 'Сделать редизайн сайта. Написать React-фронт, который подключается к Bitrix как к CMS. Сделать анимации плавными, адаптив — аккуратным.',
    done: 'Сверстал и написал клиентскую часть на React. Интегрировал с Bitrix через готовые API (ничего сложного не настраивал, просто получал и отправлял данные). Чтобы не грузили тяжелые картинки TeamLead было сразу написана функция по сжатию изображений со стороны бэкенда.',
    result: 'На момент сдачи работало быстро. Заказчик со временем добавил тяжёлые видео и картинки — скорость просела. Я проверил, что именно тормозит, написал рекомендации: сжать видео, изображений. Архитектура React в порядке, проблема в контенте.',
    gradient: 'from-violet-600/30 via-primary/20 to-background',
    tech: ['React', 'Bitrix (готовый API)', 'Адаптив', 'Анимации'],
    liveUrl: 'https://yuliawave.com',
  },
  {
    id: 2,
    title: 'Лендинг автосервиса (Bitrix)',
    url: 'fta45.ru',
    task: 'Сделать лёгкий лендинг на Bitrix. Заказчику нужно: контакты на видном месте, список услуг и форма заявки. Без лишней сложности.',
    done: 'Сверстал адаптивную страницу под мобилки и десктоп. Bitrix использовал как коробку — настраивал только вывод контента, ничего кастомного.',
    result: 'Заказчик получил сайт, который легко редактировать. Всё необходимое на месте, лишнего нет.',
    gradient: 'from-secondary/30 via-cyan-900/20 to-background',
    tech: ['Bitrix', 'Адаптивная вёрстка', 'JS (базовый)'],
    liveUrl: 'https://fta45.ru',
  },
  {
    id: 3,
    title: 'Сеть сайтов бренда (React + мультисайтинг)',
    url: 'alpinefloor.su',
    task: 'Несколько сайтов одного бренда выглядели по-разному и тормозили. Задача: сделать современный React-фронт, чтобы стили и компоненты были общие, а сайты работали плавно.',
    done: 'Были объединены несколько сайтов под один интерфейс. Участвовал в Telegram-боте для бренда. Использовались styled-components и React-router, ui-components',
    result: 'Сайты объединены под одним интерфейсом, работают быстрее старых.',
    gradient: 'from-accent/30 via-purple-900/20 to-background',
    tech: ['React', 'Bitrix API', 'SPA', 'Адаптив'],
    liveUrl: 'https://alpinefloor.su',
  },
  {
    id: 4,
    title: 'Кастомные компоненты Bitrix',
    url: 'bojeni.ru',
    task: 'Сделать на битриксе сайт по продаже светильников',
    done: 'Слайдеры, табы, вложенные разделы — всё через готовые решения Bitrix. Приходилось кастомизировать некоторые компоненты. Особенно связанный с изображениями так как при темном и светлом режиме должны были гореть или отключаться',
    result: 'В целом сайт работал стабильно. Заказчик был доволен.',
    gradient: 'from-primary/30 via-indigo-900/20 to-background',
    tech: ['Bitrix', 'Кастомные компоненты', 'Шаблонизация'],
    liveUrl: 'https://bojeni.ru',
  },
  {
    id: 5,
    title: 'Tailwind CSS в жёсткие сроки',
    url: 'varde-home.ru',
    task: 'Сделать сайт за 2 дня (работа в паре с тимлидом). Моя задача — быстро привести впорядок интерфейс на Tailwind, чтобы не тратить время на придумывание классов. На этом проекте ознакомился с Tailwind CSS и его преимуществами.',
    done: 'Сверстал страницы на Tailwind CSS. Проверял на мобилках на ходу.',
    result: 'Сдали в срок. Код чистый, заказчик доволен.',
    gradient: 'from-teal-600/30 via-secondary/10 to-background',
    tech: ['Tailwind CSS', 'Вёрстка', 'Адаптив'],
    liveUrl: 'https://varde-home.ru',
  },
  {
    id: 6,
    title: 'Первый проект на Bitrix',
    url: 'medstandart-market.ru',
    task: 'Сделать сайт на Bitrix с нуля. Срок — месяц.',
    done: 'Сверстал, натянул на Bitrix, настроил компоненты. На этом проекте ознакомился с Bitrix и его возможностями. Естественно были проблемы с bootstrap, формами, подключением модулей, инфоблоков',
    result: 'Проект было сдан в срок. Несколько мелочей поправил после сдачи.',
    gradient: 'from-blue-600/30 via-primary/10 to-background',
    tech: ['Bitrix', 'Вёрстка', 'Натяжка на CMS'],
    liveUrl: 'https://medstandart-market.ru',
  },
  {
    id: 7,
    title: 'Работа с легаси',
    url: 'gnature.ru',
    task: 'Поправить старый сайт на Bootstrap. Огромный CSS-файл, где всё смешано. Нужно переделать главную и пару страниц, но ничего не сломать. Добавить пару компонентов, свойств и вывод из инфоблоков, проблема была, что много функций были написано на версии php 5.6 и не работали на php 7.4',
    done: 'Аккуратно переделал нужные страницы. Разбил общий CSS на куски по компонентам, но старый файл оставил как есть (чтобы остальной сайт продолжал работать). Добавил новые стили точечно.',
    result: 'Нужные страницы обновились. Старые разделы не сломались. Стало чуть аккуратнее и появился адаптив.',
    gradient: 'from-orange-600/20 via-muted/30 to-background',
    tech: ['Bootstrap', 'CSS (рефакторинг)', 'Легаси', 'Bitrix', 'PHP', 'php 5.6'],
    liveUrl: 'https://gnature.ru',
  },
];

const ProjectDetail = ({ label, text }: { label: string; text: string }) => (
  <div>
    <span className="text-xs font-medium text-primary-glow uppercase tracking-wide">{label}</span>
    <p className="text-muted-foreground text-sm leading-relaxed mt-1">{text}</p>
  </div>
);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
      });

      gsap.from(containerRef.current?.children || [], {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: containerRef.current, start: 'top 82%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="snap-section py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-primary-glow text-sm font-medium mb-3 tracking-wide uppercase">
            {WORK_EXPERIENCE.period}
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Мои <span className="text-primary-glow">работы</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto" />
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass rounded-xl overflow-hidden hover:shadow-glow-primary transition-all duration-500 group flex flex-col"
            >
              <div className={`relative overflow-hidden h-44 shrink-0 bg-gradient-to-br ${project.gradient} flex flex-col items-center justify-center border-b border-white/5`}>
                <Globe size={40} className="text-primary-glow/40 mb-2 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-lg font-medium text-foreground/90">{project.url}</span>
                <span className="text-xs text-muted-foreground mt-1">Коммерческий проект</span>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  >
                    <Globe size={18} className="text-primary-foreground" />
                  </a>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary-glow transition-colors duration-300">
                  {project.title}
                </h3>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-glow hover:text-primary mb-4 inline-block"
                >
                  {project.url}
                </a>

                <div className="space-y-3 mb-4 flex-1">
                  <ProjectDetail label="Задача" text={project.task} />
                  <ProjectDetail label="Что сделано" text={project.done} />
                  {project.result && <ProjectDetail label="Итог" text={project.result} />}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary-glow text-xs rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-glow hover:text-primary transition-colors duration-300 group/link mt-auto"
                >
                  Смотреть проект
                  <ArrowUpRight
                    size={16}
                    className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default Projects;
