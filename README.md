# Портфолио — rrysbekov.ru

Одностраничный сайт-портфолио фронтенд-разработчика: React 18 + TypeScript + Vite,
анимации на GSAP, форма обратной связи с защитой от спама, Яндекс.Метрика.

## Стек

| Слой | Технологии |
|---|---|
| UI | React 18, TypeScript, Tailwind CSS |
| Сборка | Vite 5, SWC |
| Анимации | GSAP + ScrollTrigger |
| Формы | React Hook Form + Zod |
| Антиспам | honeypot + таймер заполнения + Yandex SmartCaptcha + rate limit на сервере |
| Почта | Web3Forms |
| Аналитика | Яндекс.Метрика (счётчик грузится после отрисовки страницы) |

## Быстрый старт

```bash
npm ci
cp .env.example .env    # заполнить ключи
npm run dev             # http://localhost:8080
```

## Команды

| Команда | Что делает |
|---|---|
| `npm run dev` | Дев-сервер с HMR и локальным `/api/contact` |
| `npm run build` | Продакшн-сборка в `dist/` |
| `npm run preview` | Локальный просмотр собранного `dist/` |
| `npm run typecheck` | Проверка типов без сборки |
| `npm run lint` | ESLint |
| `npm run check` | Типы + линт + сборка (то же, что в CI) |
| `npm run start:api` | Отдельный процесс API формы (прод) |

## Структура

```
src/
├── components/        UI-секции страницы (Hero, About, Projects, Contact, Chatbot…)
├── constants/         profile.ts — все личные данные в одном месте
├── hooks/             аналитика просмотра секций
├── lib/               форма, валидация, капча, rate limit, аналитика
└── pages/             Index, NotFound
server/                Node-процесс формы обратной связи
deploy/                nginx.conf, systemd-юнит, инструкция по деплою
public/                статика: robots.txt, sitemap.xml, .htaccess, favicon, PDF
```

## Форма обратной связи

Два режима:

1. **Без SmartCaptcha** — браузер отправляет данные прямо в Web3Forms.
   Проще, но публичный ключ виден в бандле.
2. **С SmartCaptcha** (заданы `VITE_YANDEX_SMARTCAPTCHA_CLIENT_KEY` и
   `YANDEX_SMARTCAPTCHA_SERVER_KEY`) — запрос идёт на `/api/contact`,
   где сервер проверяет капчу, режет частые запросы (2 за 30 сек, 5 за 10 мин на IP)
   и только потом отправляет письмо. Рекомендуемый режим для прода.

Дополнительно на обеих сторонах: honeypot-поле, минимальное время заполнения,
чёрный список одноразовых почт, лимит ссылок и стоп-слова в тексте.

## Деплой

**На сервер выкладывается только `dist/`.** Подробно — [deploy/DEPLOY.md](deploy/DEPLOY.md).

Текущий хостинг — Timeweb Cloud App Platform. Настройки деплоя:

| Поле | Значение |
|---|---|
| Фреймворк | React (не Next.js) |
| Зависимости | `npm ci` |
| Команда сборки | `npm run build` |
| Директория сборки | `dist` |
| Путь до проекта | `.` |

Переменные `VITE_*` задаются в панели **до сборки** — Vite подставляет их
в момент сборки, а не в рантайме.

CI (GitHub Actions) на каждый push проверяет типы, линт и сборку, и отдельно —
что в `dist/index.html` нет ссылки на исходник `/src/main.tsx`.
