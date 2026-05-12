# WorkflowEngine.io — Status Report

Marketing site for OptimaJet WorkflowEngine (.NET workflow automation). Forked from `formengine-next`, rebranded.

## Stack
- Next.js 16 App Router, **static export** (`output: 'export'`, no SSR/API routes/middleware)
- React 19, TypeScript 5.9, Tailwind CSS 4 (PostCSS plugin)
- Framer Motion, @xyflow/react + dagre, highlight.js, next-mdx-remote
- Build: `next build` → `next-sitemap` → `html-beautify` → `/out`
- Hosting: Netlify (planned, not yet deployed); lead-form proxy via Netlify Function

## Site structure
- `/` — Home, JSON-driven blocks from `src/data/main.json`
- `/features/` — Workflow Engine product, 11 sections from `features.json`
- `/server/` — Workflow Server product, from `server.json`
- `/downloads/` — Hardcoded TSX: version tables + NuGet + npm lists (v20.0.8)
- `/contacts/` — Real form → Netlify Function → Bitrix24
- `/blog/` + `/blog/[slug]/` — 31 MDX posts from `src/data/blog.ts`
- `/agreements/policy/` — Privacy Policy
- `/pricing/` — **Deleted**; 301 to optimajet.com via `_redirects`

## Homepage sections (in order)
1. **HeroBlock** — done. Title + review badges (G2/Trustpilot) + 4 highlights + dual CTA
2. **DesignerScreenshotBlock** — done. Designer screenshot with bg-merge into next block
3. **DetailedFeatureGridBlock** (Use cases, tabs) — done. 3 tabs: Approval / Data Processing / Long-Running
4. **CustomerTestimonialsBlock** (dark) — done. **Only 1 testimonial** (Wine.Create) — could use more
5. **FeaturesGridBlock** — done. 6 features (Designer, No-Code, Live Updates, Parallel, Portable, Multi-Lang)
6. **ProductsGridBlock** (dark) — done. Workflow Engine vs Workflow Server selector
7. **CustomerStoryBlock** — done. LKS Next case study, €100K saved / 50K workflows
8. **LogosBlock** — done. 17-logo infinite-scroll ticker (Bosch, Engie, Philips, KPMG, Honda Aero, Wine.Create, ProcessMAP, +10 more)
9. **ReviewsStripBlock** — done. 6 reviews (G2 + Trustpilot), anchored as `#reviews`
10. **ContactCTABlock** — done. "Have a question?" → /contacts/

## Key components built
- Block registry: `blocks.tsx` (home) + `PageBlocks.tsx` (sub-pages) — 12 block types, synced
- Blocks: Hero, FeaturesGrid, DetailedFeatureGrid, CustomerStory, CustomerTestimonials, Products, Logos, ReviewsStrip, Compatibility, ContactCTA, CenteredImage, CenteredVideo, DesignerScreenshot
- `Reveal` — IntersectionObserver-based scroll-reveal wrapper
- `ScrollMergedSection` — background-color merge between adjacent blocks
- `Navigation`, `Footer`, `FooterBlock`, `Button`, `ContactForm`, `ReviewChip`, `CopyableCommand`
- SEO: `MetaTags`, `JsonLd`, `GTMScript` (native `<script>`, not `next/script`)
- Blog: `ArticleShell`, `BlogCard`, `BlogCategoryFilter`, `TableOfContents`, `HlJsSyntaxHighlighter`

## Content sources
- `src/data/main.json`, `features.json`, `server.json` — JSON-driven page blocks
- `src/data/blog.ts` — blog post manifest (slug, title, cover, tags, date)
- `src/content/blog/*.mdx` — 31 post bodies (imported from legacy workflowengine.io)
- Hardcoded in TSX: `/downloads/`, `/contacts/`, `/agreements/policy/`
- LLM-facing docs: `public/llms.txt`, `public/llms-full.txt` (user-curated, do not auto-edit)
- Knowledge base: `knowledge/INDEX.md` + topic articles (architecture, routes, blog, decisions, etc.)

## Open items / known issues
- **Not deployed** — Netlify setup pending; needs `BITRIX_URL` env var or contact form returns 500
- **`package-lock.json` stale** — still references removed `@react-form-builder/*`, `@mui/*`, `@emotion/*`; regenerate before deploy
- **Sub-pages not browser-audited** — `/features/`, `/server/`, `/downloads/`, `/contacts/` likely have light-theme edge cases
- **Blog images unoptimized** — `public/images/blog/` is ~19MB / 76 files, mostly PNG/JPEG; plan: convert to webp
- **`docs/deploy.md` still says formengine.io** in examples and variable names
- **`public/sitemap.xml`, `robots.txt`, `_redirects`, `_headers`** — audit for FormEngine leftovers after first deploy
- **`__placeholder__` blog sentinel** can now be dropped since 31 real posts landed

## Recent changes
- `4462811` — Replace FormEngine favicons with WorkflowEngine icons + rebrand manifest
- `84ed2ea` — KB: refresh domain/overview with product taxonomy + naming conventions
- `18ca766` — Refresh `public/llms.txt` + add `llms-full.txt` + restore LLMs.txt footer link
- `1c5d712` — Footer cleanup, Privacy Policy page, "by Optimajet" branding, downloads polish
- `4ca1f1a` — Dark theme variants for Features/Testimonials/Compatibility/Products + content tweaks
