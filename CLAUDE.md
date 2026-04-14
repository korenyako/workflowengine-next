# WorkflowEngine Site (Next.js)

## Knowledge Base

Перед работой с проектом прочитай [knowledge/INDEX.md](knowledge/INDEX.md) и нужные статьи из вики. После значимых изменений — обновляй соответствующие статьи и добавляй запись в [knowledge/log.md](knowledge/log.md).

---

Маркетинговый сайт для OptimaJet WorkflowEngine (.NET workflow automation engine). Сделан форком из FormEngine-сайта (см. `../formengine-next`), перепрофилирован под WorkflowEngine. Репо: https://github.com/korenyako/workflowengine-next (private).

**Live site:** https://workflowengine.io (пока не задеплоен; планируется Netlify, как у FormEngine).

## Stack

- **Next.js 16** (App Router) в static export режиме (`output: 'export'`, `trailingSlash: true`)
- **React 19**, **TypeScript 5.9** (`@/*` → `./src/*`)
- **Tailwind CSS 4** (PostCSS plugin)
- **Framer Motion**, **@xyflow/react** + **dagre**, **highlight.js**, **next-mdx-remote**
- `next-sitemap` + `js-beautify` post-build

Полный список — [package.json](package.json). Подробнее — [knowledge/architecture.md](knowledge/architecture.md).

## Structure

```
src/
├── app/            # App Router (каждая папка = URL)
│   ├── page.tsx              # Home (блоки из data/main.json)
│   ├── features/             # STUB
│   ├── server/               # STUB
│   ├── downloads/            # STUB
│   ├── pricing/              # Live (copy нужно переписать)
│   ├── contacts/             # Live (форма-заглушка)
│   └── blog/[slug]/          # MDX, сейчас пусто
│   # pricing/ удалена — /pricing/ 301-редиректит на optimajet.com
├── components/     # ~100 блоков-компонентов (Hero*, Centered*, TwoColumn*, FAQ, ...)
├── content/blog/   # MDX-тексты статей (пусто)
├── data/           # blog.ts + main.json (остальное удалено в Phase 1)
├── forms/          # JSON-схемы форм (legacy от FormEngine, мусор)
├── lib/, utils/, styles/
public/             # Статика, sitemap.xml, robots.txt, _redirects, _headers, logos
netlify/            # Netlify Functions (lead proxy)
docs/deploy.md      # Полный deploy guide (Docker+Nginx, standalone, rsync)
knowledge/          # LLM-вики (начинать с INDEX.md)
```

Карта маршрутов и их статуса — [knowledge/routes.md](knowledge/routes.md).

## Commands

```bash
npm install        # Зависимости
npm run dev        # http://localhost:3000
npm run build      # next build → next-sitemap → html-beautify → /out
npm run start      # Production-сервер (опционально — для проверки локально)
npm run lint       # ESLint (next lint)
```

## Environment

Сборке **env переменные не нужны**.

## Критичные правила для AI

1. **Static export** → никаких API routes, middleware, SSR, `next/script`. Всё внешнее — нативный `<script>` или `useEffect`. Детали и паттерны — [knowledge/external-scripts.md](knowledge/external-scripts.md) и [knowledge/decisions.md](knowledge/decisions.md).
2. **Динамические маршруты** (`[slug]`) обязаны иметь `generateStaticParams()` возвращающий не пустой массив. Для пустого блога используется sentinel-slug `__placeholder__` — см. [knowledge/blog.md](knowledge/blog.md).
3. **`@react-form-builder/*`, `@mui/*`, `@emotion/*` удалены** из зависимостей (наследие FormEngine). Не восстанавливать без явной необходимости. Компоненты, которые на них завязаны, сейчас рендерят плейсхолдеры — список в [knowledge/decisions.md](knowledge/decisions.md#6-broken-form-viewer-imports-replaced-with-placeholders-not-deleted).
4. **Блочная система** ([src/components/blocks.tsx](src/components/blocks.tsx)): неизвестные `type` в JSON молча игнорируются, не кидают ошибок. При добавлении нового блока — зарегистрировать его в `components: {}` и в `PageBlocks.tsx` если используется на sub-page.
5. **`package-lock.json` устарел** после форка (ссылается на удалённые пакеты). Перед деплоем — перегенерировать чистым `npm install`.
6. **Sitemap**: `public/sitemap.xml` авто-генерится из `next-sitemap` при build. `public/robots.txt` и `public/_redirects` правятся руками — правила в исходном README (FormEngine) + аудит записан в [knowledge/plans/roadmap.md](knowledge/plans/roadmap.md).
7. **Логотип** в `public/logos/workflowengine.svg` пока является переименованным логотипом FormEngine — заменить при первой возможности.
8. **WorkflowEngine — закрытый коммерческий продукт.** Никаких GitHub/MIT/"open-source"/"star us"/community-discussions на сайте. В отличие от FormEngine Core (MIT, в GitHub). Никаких GitHub-иконок в нав/футере, никакой stargazers-интеграции. Подробнее — [knowledge/domain/overview.md](knowledge/domain/overview.md).
9. **Не добавлять `Co-Authored-By: Claude`** в коммиты (см. глобальный `~/.claude/CLAUDE.md`). Git user настроен на `Anton Korenyako`.

## Relationship to source project

Форк из `C:/Work/Optimajet/formengine-next` (живой FormEngine marketing site). Отдельная git-история, отдельный GitHub-repo. Синхронизации с upstream нет — фиксы портируются вручную. Подробнее — [knowledge/decisions.md](knowledge/decisions.md#7-fork-strategy-clean-repo-not-git-fork).
