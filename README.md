# FormEngine Website (Next.js)

Marketing and documentation website for [FormEngine](https://formengine.io) — React form builder ecosystem.

**Live site:** https://formengine.io

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build (static export to /out)
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript 5.9**
- **Tailwind CSS 4** — Styling
- **Framer Motion** — Animations
- **@xyflow/react** + **dagre** — Interactive architecture diagrams
- **highlight.js** — Code syntax highlighting

---

<details>
<summary><strong>How It Works</strong></summary>

The site uses Next.js in **static export** mode (`output: 'export'`). During build (`npm run build`), all pages are compiled into plain HTML/CSS/JS files in the `/out` folder. No server is needed — the output can be hosted on any static file server.

### Content Management

Page content is driven by JSON files in `src/data/`:

- `main.json` — Homepage blocks
- `core.json` — Core library page
- `designer.json` — Designer library page

Each JSON describes a set of **blocks** (page sections). Each block has a `type` field, and the corresponding React component is rendered based on it — hero sections, FAQ accordions, comparison tables, etc.

</details>

<details>
<summary><strong>Как устроен сайт (на русском)</strong></summary>

### Что это за проект

Это **маркетинговый и документационный сайт** для продукта FormEngine — конструктора форм на React. Сайт рассказывает о продукте, показывает примеры, содержит страницы сравнений, цены и контакты.

### Технология: Next.js со статическим экспортом

Сайт сделан на **Next.js** — это популярный фреймворк для React. Но работает он в особом режиме — **статический экспорт** (`output: 'export'`).

Что это значит на практике:

1. **При сборке** (`npm run build`) весь сайт превращается в набор обычных HTML/CSS/JS файлов в папке `/out`
2. **Сервер не нужен** — эти файлы можно положить на любой хостинг (Netlify, GitHub Pages и т.д.), как обычный статический сайт
3. **Нет серверной логики** — нельзя делать API-запросы через сервер, нельзя обрабатывать формы на бэкенде

### Как формируется контент

Контент страниц хранится в **JSON-файлах** в папке `src/data/`:

- `main.json` — блоки главной страницы
- `core.json` — страница Core библиотеки
- `designer.json` — страница дизайнера

Каждый JSON описывает набор **блоков** — секций страницы. У каждого блока есть `type` (тип), и в зависимости от типа рендерится нужный React-компонент (герой, FAQ, таблица сравнений и т.д.). Это что-то вроде мини-CMS на файлах.

### Как разрабатывать

```bash
npm install    # один раз — установить зависимости
npm run dev    # запустить локально на http://localhost:3000
npm run build  # собрать для деплоя (результат в /out)
```

### Где что лежит (упрощённо)

| Папка | Что внутри |
|-------|-----------|
| `src/app/` | Страницы сайта (каждая папка = URL) |
| `src/components/` | 110+ компонентов — кирпичики, из которых собираются страницы |
| `src/data/` | JSON с контентом страниц |
| `public/` | Картинки, иконки, видео, favicon и т.д. |

### Деплой

Сайт хостится на **Netlify**. При каждом пуше в Git Netlify автоматически собирает проект и обновляет сайт. Файлы `_redirects` и `_headers` в `public/` — это конфиг для Netlify.

### Почему статический экспорт, а не обычный сервер?

- **Быстрее** — страницы уже готовые HTML-файлы, ничего не генерируется на лету
- **Дешевле** — не нужен сервер, только хостинг статических файлов
- **Надёжнее** — нечему сломаться на сервере, потому что сервера нет

Минус один — нет серверной логики. Поэтому, например, контактная форма работает через внешний виджет Битрикс24, а не через свой бэкенд.

</details>

<details>
<summary><strong>Project Structure</strong></summary>

```
src/
├── app/                         # Next.js App Router pages (each folder = URL route)
│   ├── layout.tsx              # Root layout (fonts, nav, footer)
│   ├── page.tsx                # Homepage
│   ├── react-form-library/     # Core library docs
│   ├── react-form-builder-library/  # Builder docs
│   ├── react-form-components-library/
│   │   └── data-grid/          # DataGrid docs
│   ├── ai-form-builder/        # AI form builder
│   ├── comparison/             # [slug] comparison pages
│   ├── libraries/              # [slug] library pages
│   ├── contacts/               # Contact page
│   ├── pricing/                # Pricing page
│   └── ...
│
├── components/                  # 110+ React components
│   ├── Navigation.tsx          # Header navigation
│   ├── Footer.tsx              # Site footer
│   ├── blocks.tsx              # Content block orchestration
│   ├── Hero*.tsx               # Hero section variants
│   ├── ArchitectureDiagram.tsx # React Flow diagrams
│   ├── ComparisonTable.tsx     # Feature comparisons
│   ├── FAQBlock.tsx            # FAQ accordion
│   ├── content/                # CodeBlock, Heading, List
│   └── icons/                  # SVG icon components
│
├── data/                        # JSON content and schemas
│   ├── main.json               # Homepage blocks (17 types)
│   ├── core.json               # Core library data
│   ├── designer.json           # Designer library data
│   ├── forms/                  # Form schema examples
│   ├── comparisons.ts          # Comparison data
│   └── libraries.ts            # Library comparison data
│
├── lib/                         # Utility libraries
├── utils/                       # SEO helpers
└── styles/                      # Global styles + Tailwind

public/                          # Static assets (images, icons, videos)
```

</details>

<details>
<summary><strong>Key Routes</strong></summary>

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/react-form-library` | Core library (JSON form renderer) |
| `/react-form-builder-library` | Visual form builder |
| `/react-form-components-library` | UI components library |
| `/react-form-components-library/data-grid` | DataGrid component |
| `/ai-form-builder` | AI-powered form builder |
| `/pricing` | Pricing page |
| `/comparison/[slug]` | Dynamic comparison pages |
| `/libraries/[slug]` | Dynamic library pages |
| `/contacts` | Contact page |

</details>

<details>
<summary><strong>Deployment</strong></summary>

The site is hosted on **Netlify**. On every push to Git, Netlify automatically builds the project and updates the live site.

- `public/_redirects` and `public/_headers` — Netlify configuration
- Build output goes to `/out` folder
- Compatible with any static hosting (Netlify, Vercel, GitHub Pages)

### Why Static Export?

- **Fast** — pages are pre-built HTML files, nothing is generated on the fly
- **Cheap** — no server needed, just static file hosting
- **Reliable** — nothing can break on the server because there is no server

The tradeoff is no server-side logic. For example, the contact form uses an external Bitrix24 widget instead of a custom backend.

</details>

<details>
<summary><strong>Products Showcased</strong></summary>

1. **FormEngine Core** — Open-source JSON form renderer (MIT)
2. **Form Builder** — Visual drag-and-drop editor (formbuilder.formengine.io)
3. **Form Components** — RSuite-based UI components
4. **AI Form Builder** — ChatGPT integration for form generation
5. **VSCode Extension** — FormEngine Core IDE integration

</details>
