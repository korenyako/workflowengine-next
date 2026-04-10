# Сборка и деплой formengine-next

Инструкция по сборке и развёртыванию сайта formengine.io на сервере.

## Требования

- **Node.js** 20+ и **npm**
- **Docker** и **Docker Compose** (для вариантов A и B)
- **Git** для получения исходного кода

## Сборка проекта

```bash
git clone <repo-url> formengine-next
cd formengine-next
npm install
npm run build
```

Результат сборки — папка `out/` с готовыми статическими файлами (HTML, CSS, JS, изображения). Эту папку нужно разместить на веб-сервере.

---

## Вариант A: Nginx + Docker (рекомендуемый)

Самый простой и лёгкий вариант. Сайт собирается внутри Docker-контейнера и раздаётся через nginx.

### 1. Создать `nginx.conf` в корне проекта

```nginx
server {
    listen 80;
    server_name formengine.io;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip-сжатие
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml image/svg+xml;
    gzip_min_length 256;

    # Trailing slash: редирект /path → /path/
    rewrite ^([^.\?]*[^/])$ $1/ permanent;

    # Редирект /pricing/ → /react-form-builder-library/pricing/
    location = /pricing/ {
        return 301 /react-form-builder-library/pricing/;
    }

    # Noindex для демо-страниц
    location /demos {
        add_header X-Robots-Tag "noindex, nofollow" always;
        try_files $uri $uri/index.html /index.html;
    }

    # Кеширование статических ресурсов (хешированные файлы — 1 год)
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Кеширование изображений (1 неделя)
    location /images/ {
        expires 7d;
        add_header Cache-Control "public, stale-while-revalidate=86400";
    }

    # Кеширование иконок и логотипов (1 неделя)
    location /icons/ {
        expires 7d;
        add_header Cache-Control "public";
    }

    location /logos/ {
        expires 7d;
        add_header Cache-Control "public";
    }

    # Кеширование шрифтов (1 год)
    location ~* \.(woff2?|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Кеширование stargazers.json (5 минут)
    location = /stargazers.json {
        add_header Cache-Control "public, max-age=300, s-maxage=21600";
    }

    # Основные страницы — ищем файл, потом index.html в папке, иначе SPA fallback
    location / {
        try_files $uri $uri/index.html /index.html;
    }
}
```

### 2. Создать `Dockerfile` в корне проекта

```dockerfile
# Этап 1: сборка
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Этап 2: nginx для раздачи статики
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3. Создать `docker-compose.yml` в корне проекта

```yaml
services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

### 4. Запуск

```bash
# Собрать образ и запустить
docker compose up -d --build

# Проверить что контейнер работает
docker compose ps

# Посмотреть логи
docker compose logs -f web

# Остановить
docker compose down
```

---

## Вариант B: Node.js standalone + Docker

Этот вариант нужен, если в будущем планируется использовать серверные возможности Next.js (SSR, API routes, middleware). Сайт запускается как Node.js-приложение.

### 1. Изменить `next.config.ts`

Заменить `output: 'export'` на `output: 'standalone'`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

> **Важно:** при переключении на `standalone` убирается `trailingSlash`, т.к. trailing slash обрабатывается самим Next.js сервером. Если trailing slash нужен — верните `trailingSlash: true`.

### 2. Создать `Dockerfile.standalone` в корне проекта

```dockerfile
# Этап 1: сборка
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Этап 2: запуск
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Копируем standalone-сборку
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

### 3. Создать `docker-compose.standalone.yml`

```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.standalone
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### 4. Запуск

```bash
# Собрать и запустить
docker compose -f docker-compose.standalone.yml up -d --build

# Проверить
docker compose -f docker-compose.standalone.yml ps

# Логи
docker compose -f docker-compose.standalone.yml logs -f web

# Остановить
docker compose -f docker-compose.standalone.yml down
```

> **Примечание:** в этом варианте рекомендуется поставить перед контейнером reverse proxy (nginx или Caddy) для SSL, кеширования и gzip.

---

## Вариант C: Без Docker (копирование на сервер)

Если Docker не используется — можно просто собрать сайт локально и скопировать папку `out/` на сервер.

### 1. Собрать локально

```bash
npm install
npm run build
```

### 2. Скопировать на сервер

```bash
# Через rsync (Linux/macOS)
rsync -avz --delete out/ user@server:/var/www/formengine.io/

# Или через scp
scp -r out/* user@server:/var/www/formengine.io/
```

### 3. Настроить nginx на сервере

Скопировать конфигурацию из Варианта A (секция `nginx.conf`), заменив `root` на путь к файлам:

```nginx
root /var/www/formengine.io;
```

Затем:

```bash
# Проверить конфигурацию nginx
sudo nginx -t

# Перезагрузить nginx
sudo systemctl reload nginx
```

---

## Обновление сайта

Пошаговый процесс выкатки новой версии.

### С Docker (вариант A)

```bash
cd formengine-next

# 1. Получить последние изменения
git pull origin main

# 2. Пересобрать и перезапустить контейнер
docker compose up -d --build

# 3. Проверить
docker compose ps
curl -I http://localhost
```

### Без Docker (вариант C)

```bash
cd formengine-next

# 1. Получить последние изменения
git pull origin main

# 2. Установить зависимости (если изменились)
npm install

# 3. Собрать
npm run build

# 4. Скопировать на сервер
rsync -avz --delete out/ user@server:/var/www/formengine.io/
```

---

## Проверка работоспособности

После деплоя убедитесь, что сайт работает корректно:

```bash
# Главная страница возвращает 200
curl -I http://formengine.io/

# Страницы с trailing slash работают
curl -I http://formengine.io/react-form-library/

# Редирект /pricing/ → /react-form-builder-library/pricing/
curl -I http://formengine.io/pricing/

# Статика отдаётся (проверить любое изображение)
curl -I http://formengine.io/images/logo.png
```

---

## Частые проблемы

| Проблема | Решение |
|----------|---------|
| `npm run build` падает с ошибкой памяти | Увеличить лимит: `NODE_OPTIONS="--max-old-space-size=4096" npm run build` |
| Страницы возвращают 404 | Проверить `try_files` в nginx — должен быть fallback на `index.html` |
| Стили не загружаются | Проверить что папка `_next/static/` скопирована вместе с `out/` |
| Docker build долго работает | Добавить `.dockerignore` с `node_modules`, `.next`, `out`, `.git` |
| Контейнер перезапускается в цикле | Проверить логи: `docker compose logs web` |

### Рекомендуемый `.dockerignore`

```
node_modules
.next
out
.git
.github
.vscode
.idea
*.md
```
