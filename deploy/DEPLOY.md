# Деплой rrysbekov.ru

## Главное правило

**На сервер выкладывается только содержимое папки `dist/`.**
Не репозиторий, не `src/`, не `node_modules`, не `.env`.

Как понять, что выложено неправильно (именно это и случилось 20.08.2026):

```bash
curl -sI https://rrysbekov.ru/src/main.tsx | head -1
# Должно быть 404 или 444. Если 200 — на сервере лежат исходники,
# и сайт у посетителей не запускается: браузер не умеет выполнять .tsx.
```

Ещё признак: в `index.html` на сайте есть строка `<script type="module" src="/src/main.tsx">`.
В правильной сборке там `<script type="module" crossorigin src="./assets/index-<hash>.js">`.

---

## 1. Сборка

```bash
npm ci
npm run check        # типы + линт + сборка
```

После сборки в `dist/` должно быть:

```
dist/
├── index.html          ← ссылается на ./assets/*.js
├── assets/             ← js и css с хэшами в именах
├── .htaccess           ← правила для Apache
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── Portfolio.pdf
```

## 2. Вариант A — VPS с nginx

```bash
# 1. Код и сборка на сервере
sudo mkdir -p /var/www/rrysbekov
sudo chown -R $USER:$USER /var/www/rrysbekov
git clone git@github.com:DannyKGZ/Portfolio.git /var/www/rrysbekov
cd /var/www/rrysbekov
npm ci && npm run build

# 2. .env только на сервере, читаемый лишь владельцем
cp .env.example .env && nano .env
chmod 600 .env

# 3. nginx
sudo cp deploy/nginx.conf /etc/nginx/conf.d/rrysbekov.conf
sudo nginx -t && sudo systemctl reload nginx

# 4. HTTPS
sudo certbot --nginx -d rrysbekov.ru -d www.rrysbekov.ru

# 5. API формы (нужен, только если включена SmartCaptcha)
sudo cp deploy/portfolio-api.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now portfolio-api
curl -s localhost:8787/health
```

Обновление сайта:

```bash
cd /var/www/rrysbekov && git pull && npm ci && npm run build
sudo systemctl restart portfolio-api   # если API используется
```

## 3. Вариант B — шаред-хостинг (FTP/панель, Apache)

1. Локально: `npm ci && npm run build`
2. Загрузить в корень сайта **содержимое** `dist/` (не саму папку `dist`).
3. Убедиться, что `.htaccess` загрузился — FTP-клиенты часто прячут файлы с точки.
4. Форма: на шаред-хостинге Node обычно недоступен, поэтому SmartCaptcha
   оставляем выключенной (`VITE_YANDEX_SMARTCAPTCHA_CLIENT_KEY` пустой) —
   письма уходят напрямую через Web3Forms.

## 4. Проверка после деплоя

```bash
curl -sI https://rrysbekov.ru/                 # 200, Content-Type: text/html
curl -s  https://rrysbekov.ru/ | grep assets   # ссылка на ./assets/index-*.js
curl -sI https://rrysbekov.ru/src/main.tsx     # 404/444
curl -sI https://rrysbekov.ru/.env             # 403/404/444
curl -sI https://rrysbekov.ru/wp-admin/install.php   # 403/444
curl -s  https://rrysbekov.ru/robots.txt | head -3   # реальный robots, не HTML
curl -s  https://rrysbekov.ru/sitemap.xml | head -2  # реальный xml, не HTML
curl -sI https://rrysbekov.ru/Portfolio.pdf    # 200, application/pdf
```

Дополнительно: открыть сайт в браузере, вкладка Network — не должно быть
запросов к `/src/*`, а в консоли не должно быть ошибок загрузки модулей.

## 5. Если снова «положили» сайт

Что было в логах 20.08.2026: ~90 запросов за сутки, из них половина —
Googlebot, ClaudeBot, OAI-SearchBot и сканеры WordPress. **Это не DDoS**,
такую нагрузку держит любой хостинг. Сайт не открывался не из-за ботов,
а из-за того, что выложены были исходники.

Реальный признак атаки — сотни запросов в секунду с десятков IP.
Тогда:

```bash
# кто больше всех
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -20
# куда долбят
awk '{print $4}' access.log | sort | uniq -c | sort -rn | head -20
```

и дальше — Cloudflare (режим "Under Attack") либо `limit_req` в nginx,
который уже прописан в `deploy/nginx.conf`.

---

## 6. Если что-то перестало грузиться после включения CSP

Заголовок `Content-Security-Policy` (в `deploy/nginx.conf` и `public/.htaccess`)
разрешает только нужные внешние домены: Метрику, Google Fonts, SmartCaptcha
и Web3Forms. Если добавите новый внешний скрипт или шрифт — его домен нужно
внести в CSP, иначе браузер его заблокирует.

Диагностика: DevTools → Console, ошибка вида
`Refused to load ... because it violates the following Content Security Policy directive`.
В ошибке указана директива (`script-src`, `connect-src`, `font-src`) —
туда и добавляйте домен.

## 7. Порядок обновления после этих правок

```bash
npm ci          # package-lock изменился: убраны lenis и react-router-dom
npm run check   # типы + линт + сборка
```

Старая папка `dist/` в рабочей копии осталась от прошлой сборки — она
перезапишется при `npm run build`.
