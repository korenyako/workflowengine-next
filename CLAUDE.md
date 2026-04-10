# FormEngine Website (Next.js)

Marketing and documentation website for OptimaJet FormEngine - React form builder ecosystem.
This is a Next.js rebuild of the original Vite-based site.

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
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **@xyflow/react** + **dagre** - Interactive architecture diagrams
- **highlight.js** - Code syntax highlighting

## Project Structure

```
src/
├── app/                         # Next.js App Router pages
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
│   ├── Centered*.tsx           # Centered content blocks
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
│   ├── demoSchemas.ts          # Demo form configs
│   └── stargazersCache.ts      # GitHub stars cache
│
├── utils/
│   └── seo.ts                  # SEO helpers
│
└── styles/
    └── globals.css             # Global styles + Tailwind

public/                          # Static assets
├── images/                     # Product images
├── icons/                      # SVG icons
├── logos/                      # Brand logos
├── videos/                     # Demo videos
├── sitemap.xml                 # SEO sitemap
├── robots.txt                  # Crawler config
├── _redirects                  # Netlify redirects
└── stargazers.json             # GitHub stars cache
```

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/react-form-library` | Core library (JSON form renderer) |
| `/react-form-builder-library` | Visual form builder |
| `/react-form-components-library` | UI components library |
| `/react-form-components-library/data-grid` | DataGrid component |
| `/ai-form-builder` | AI-powered form builder |
| `/pricing` | Redirects to `/react-form-builder-library/pricing/` |
| `/comparison/[slug]` | Dynamic comparison pages |
| `/libraries/[slug]` | Dynamic library pages |
| `/contacts` | Contact page |
| `/llms.txt` | Site-level LLMs.txt (static file) |

## Key Configuration

- **next.config.ts** - Static export (`output: 'export'`), trailing slashes enabled
- **tailwind.config.ts** - Custom fonts, primary blue color scale
- **tsconfig.json** - Path alias `@/*` → `./src/*`

## Content Management

Page content is driven by JSON files in `src/data/`:
- `main.json` - Homepage blocks configuration
- `core.json` - Core library page
- `designer.json` - Designer library page
- Block components render based on `type` field

## Build Output

- **Static export** to `/out` folder
- No server required - deploy anywhere
- Images unoptimized (static export compatible)

## Deployment

Ready for static hosting:
- **Netlify** - Uses `_redirects`, `_headers` in public/
- **Vercel** - Auto-detected
- **GitHub Pages** - Use `/out` folder
- Any static file server

## Products Showcased

1. **FormEngine Core** - Open-source JSON form renderer (MIT)
2. **Form Builder** - Visual drag-and-drop editor (formbuilder.formengine.io)
3. **Form Components** - RSuite-based UI components
4. **AI Form Builder** - ChatGPT integration for form generation
5. **VSCode Extension** - FormEngine Core IDE integration

## Differences from Vite Version

| Aspect | Vite (formengine) | Next.js (formengine-next) |
|--------|-------------------|---------------------------|
| Router | React Router DOM | Next.js App Router |
| Build | Vite + Puppeteer pre-render | Static export |
| Dev port | 5173 | 3000 |
| Routing | `src/pages/*.tsx` | `src/app/*/page.tsx` |
| Layout | In App.tsx | In layout.tsx files |

## Important: External Scripts in Static Export

### GTM (Google Tag Manager)

**Не использовать `next/script` для GTM.** В static export (`output: 'export'`) `next/script` с любой стратегией (`afterInteractive`, `beforeInteractive`) не вставляет обычный `<script>` в HTML. Вместо этого GTM-код попадает в RSC-payload (JSON-данные React Server Components), и его выполнение зависит от гидратации Next.js. Если гидратация тормозит или ломается — GTM не загружается, и все виджеты из него (Calendly, Clarity и т.д.) тоже не работают.

**Правильный подход** — обычный `<script>` через `dangerouslySetInnerHTML` в `<head>`:
```tsx
<head>
  <script dangerouslySetInnerHTML={{ __html: `...GTM code...` }} />
</head>
```
Это рендерится как настоящий HTML-тег, выполняется сразу при парсинге страницы, без зависимости от Next.js runtime.

### Контактная форма (Битрикс24)

Контактная форма использует встроенный виджет Битрикс24 CRM вместо FormEngine contact form, т.к. static export не имеет бэкенд-прокси (в Vite-версии `/backend/` проксируется на `localhost:8093`, а в Next.js static export это невозможно).

Битрикс24 виджет подключается через `useEffect` в `src/app/contacts/page.tsx`, воспроизводя оригинальный embed-код. Нельзя использовать `next/script` — Битрикс24 loader ищет атрибут `data-b24-form` на самом теге `<script>`.

### Общее правило

Для static export любые внешние скрипты, которые должны работать надёжно (аналитика, виджеты, трекеры), лучше подключать через нативные `<script>` теги или `useEffect`, а не через `next/script`. Компонент `next/script` оптимален для приложений с серверным рендерингом, но в static export создаёт ненужную зависимость от гидратации.

## Sitemap Rules

- `public/sitemap.xml` must only contain **canonical URLs that return HTTP 200 directly** — no redirects (301/302), no aliases, no non-existent pages.
- If a URL has a redirect in `_redirects`, only the **target** URL belongs in the sitemap, not the source.
- Before adding a URL to the sitemap, verify it is not listed in `_redirects` as a redirect source.
- `robots.txt` Disallow rules and sitemap entries must not contradict each other.

## Notes

- Path alias: `@/` maps to `src/`
- Uses Next.js App Router (not Pages Router)
- Static export mode - no API routes
- Fonts loaded via `next/font/google`
