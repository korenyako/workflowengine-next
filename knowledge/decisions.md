---
title: Architectural decisions
---

# Architectural decisions

Why things are the way they are. Each decision lists **context** → **choice** → **consequence**.

## 1. Static export (`output: 'export'`)

**Context:** Marketing site, no user accounts, no real-time data, SEO-critical.
**Choice:** `next.config.ts` → `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`.
**Consequence:** No API routes, no middleware, no server-side rewrites in production. External services handle anything dynamic (contact form → Bitrix24, analytics → GTM). Every dynamic route **must** have `generateStaticParams()`. See [architecture.md](architecture.md).

## 2. GTM via raw `<script>`, never `next/script`

**Context:** Static export puts `next/script` output into the RSC payload, not into HTML. If hydration stalls, GTM never loads, and everything downstream (Clarity, Calendly, etc.) breaks.
**Choice:** Inject GTM with `<script dangerouslySetInnerHTML={{ __html }}>` in `<head>` — see [components/GTMScript.tsx](../src/components/GTMScript.tsx), used in [app/layout.tsx](../src/app/layout.tsx).
**Consequence:** GTM runs during HTML parse, independent of React hydration. This is the canonical pattern for any third-party script in this project. See [external-scripts.md](external-scripts.md).

## 3. Bitrix24 widget for contact form

**Context:** No backend → cannot submit to an internal API. Vite-era site proxied `/backend/` to `localhost:8093` — impossible in static export.
**Choice:** Embed Bitrix24 CRM widget directly in `src/app/contacts/page.tsx` via `useEffect`. **Must not** use `next/script` — the Bitrix24 loader reads `data-b24-form` off the `<script>` tag itself.
**Consequence:** All contact submissions go straight to Bitrix24 CRM. No backend to maintain. Currently the widget is stubbed with a placeholder in `ContactForm.tsx` (from the WorkflowEngine fork) — see [plans/roadmap.md](plans/roadmap.md).

## 4. `__placeholder__` slug for empty blog

**Context:** Next.js 16 `output: 'export'` rejects dynamic routes whose `generateStaticParams()` returns `[]`: *"Page is missing generateStaticParams"*. The blog was emptied during the fork.
**Choice:** When `blogPosts.length === 0`, return `[{ slug: '__placeholder__' }]` — see [app/blog/[slug]/page.tsx](../src/app/blog/[slug]/page.tsx). Once real posts exist, the placeholder is skipped.
**Consequence:** Build emits `/blog/__placeholder__/index.html` in `out/`. Nothing links to it. Disappears automatically once posts are added. Delete the whole `[slug]` route if you want `out/` perfectly clean before adding content.

## 5. Deleted dev-only `rewrites()` from `next.config.ts`

**Context:** The FormEngine version had a dev-mode rewrite for `/backend/:path* → http://localhost:8093/...`. Under Next.js 16 static export this tripped the static-params validator and surfaced as the (misleading) *"missing generateStaticParams"* error even on routes that did have one.
**Choice:** Removed the rewrite entirely.
**Consequence:** If a local dev backend is ever needed again, proxy through a separate tool (or revive the rewrite and live with the build caveat).

## 6. Broken form-viewer imports replaced with placeholders, not deleted

**Context:** Fork removed `src/components/formengine/` (MUI/Mantine form viewers) and the `@react-form-builder/*` npm packages. Several block components still import from those paths and are referenced by JSON data files.
**Choice:** Rewrite the affected components ([ContactForm.tsx](../src/components/ContactForm.tsx), [FormDemoBlock.tsx](../src/components/FormDemoBlock.tsx), [ProcessPreview.tsx](../src/components/ProcessPreview.tsx), [MUIBasicUsageBlock.tsx](../src/components/MUIBasicUsageBlock.tsx), [MantineBasicUsageBlock.tsx](../src/components/MantineBasicUsageBlock.tsx), [MuiFormDemoBlock.tsx](../src/components/MuiFormDemoBlock.tsx)) to render a gray "Demo placeholder" instead of deleting them, preserving the JSON interface.
**Consequence:** Build is green. When replacing homepage copy, either remove these block references from JSON data or re-purpose the placeholders.

## 7. Fork strategy: clean repo, not git fork

**Context:** New product, new repo, no desire to inherit FormEngine's history.
**Choice:** File-copy from `formengine-next`, fresh `git init`, new GitHub repo ([korenyako/workflowengine-next](https://github.com/korenyako/workflowengine-next), private). Original project at `C:/Work/Optimajet/formengine-next` stays untouched.
**Consequence:** Clean history starting at commit `0efe811`. No automatic sync from upstream — any shared bug fixes need manual port.

## 8. Brand palette: `#93d8ff → #85afff` cyan-blue, no purple

**Context:** FormEngine era used a pastel blue-purple gradient (`from-blue-300 to-purple-300`) on CTAs and decorative pills. Purple does not fit the WorkflowEngine identity (closed-source .NET B2B product) and no longer matches any planned brand direction.
**Choice:** Single gradient `#93d8ff → #85afff` — extracted from the brand icon set's [layers.svg](../public/icons/layers.svg). Hover darkens to `#7dc3f4 → #6e99ec`. Applied across 9 components: `Button` (primary), `BundleSizeTableBlock`, `ComparisonTimeline`, `ComponentsTable`, `ContactCTABlock`, `HeroWithCodeBlock`, `LargeCenteredImageBlock`, `ProductsGridBlock`, `TimelineBlock`.
**Consequence:** Consistent brand feel across the site. Any new UI with an accent colour should reuse these hex codes (or the predefined classes that wrap them). Purple is allowed only inside the deliberate OpenAI-rainbow borders on AI-related components (`ChatGPTButton`, `CenteredAIBlock`, `HeroBlock.gradientButton`) — those aren't used on current pages but left in place for possible reuse.

## 9. Buttons: solid fill, no gradient; secondary outlined

**Context:** The brand gradient looks right on icon backgrounds and decorative pills but feels visually busy on action buttons.
**Choice:** Buttons themselves get a flat solid colour.
- **Primary:** `bg-[#93d8ff] hover:bg-[#7dc3f4] text-gray-900`.
- **Secondary:** outlined — `border border-[#93d8ff] bg-transparent text-slate-900`; hover fills with `#93d8ff` (same as primary, so the two read as a family).

Gradient remains on non-button surfaces (icon containers, badges, table highlights). See [Button.tsx](../src/components/Button.tsx).
**Consequence:** Cleaner CTA hierarchy on light backgrounds. When adding a new button, reuse the `variant="primary"` / `variant="secondary"` props — don't hand-roll gradient classes.

## 10. `Link` prefetch disabled

**Context:** Next's `<Link>` prefetches the target route by default. Under `output: 'export'`, prefetching a URL whose slug isn't in `generateStaticParams` (e.g. `/blog/why-use-a-workflow-engine/` before the blog is ported) crashes dev HMR with *Failed to fetch* and spams the console. Prefetching also buys little in a pure static site — the browser cache already handles repeat visits.
**Choice:** [Button.tsx](../src/components/Button.tsx) passes `prefetch={false}` to `<Link>` unconditionally.
**Consequence:** No prefetch errors while the blog is empty. Any future primitive that wraps `next/link` should do the same until there's a concrete reason to re-enable it.
