import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'phosphor-react';
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
    tech: ['Bootstrap', 'CSS (рефакторинг)', 'Легаси', 'Bitrix', 'PHP', 'php 5.6'],
    liveUrl: 'https://gnature.ru',
  },
];

const ProjectDetail = ({ label, text }: { label: string; text: string }) => (
  <div>
    <span className="section-label">{label}</span>
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
    <section id="projects" ref={sectionRef} className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div ref={titleRef} className="flex items-start justify-between mb-16">
          <div>
            <p className="section-label mb-3">{WORK_EXPERIENCE.period}</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Мои работы<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="section-num hidden md:block">03</p>
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
                      >
                        {project.url}
                      </a>
                    </div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline shrink-0"
                    >
                      Смотреть проект
                      <ArrowUpRight size={16} />
                    </a>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <ProjectDetail label="Задача" text={project.task} />
                    <ProjectDetail label="Что сделано" text={project.done} />
                    {project.result && <ProjectDetail label="Итог" text={project.result} />}
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
