---
title: Content migration from workflowengine.io
---

# Content migration from workflowengine.io

Scope doc for porting live content from **workflowengine.io** (legacy Drupal-ish site) into this Next.js fork. Snapshotted 2026-04-14. Re-scrape before actually starting work.

## Site inventory

### Live marketing pages (target for migration)

| URL | Our route | Scope (at snapshot) |
|-----|-----------|---------------------|
| `/` (home) | `/` | 7 sections: hero, Quick Overview, Supported Processes, Core Features, Which Product Do I Need?, SaaS Licensing, Customers, Contact. |
| `/features/` | `/features/` | 11 H2 sections — Designer, Core Components, Versioning, Parallel, XML I/O, Localization, Timers, Compatibility, Integration, BPMN 2.0, Security. Plus "Open feature list in Google Sheets" CTA. |
| `/server/` | `/server/` | 6 sections: Overview, Why Workflow Server (4 benefits), System Requirements, API (Workflow + Callback), Application Modes, Contact. |
| `/downloads/` | `/downloads/` | Tables with current versions (e.g. **20.0.8**, 2026-01-04), NuGet packages, Designer npm packages, GitHub link. |
| `/pricing/` (301 → `optimajet.com/products/workflowengine/price/`) | `/pricing/` | No published tiers. Community Edition (free, non-commercial) + Commercial (book-a-meeting). Support 50%/year, Updates 50%/year, combined 70%. |
| `/blog/` | `/blog/` | ~20 posts, no visible category system. Reverse-chronological list. |
| `/agreements/eula/` | — | EULA legal text. No route planned yet; could live at `/agreements/eula/` or link out. |
| `/agreements/csa/` | — | Customer Support Agreement legal text. Same question as EULA. |

### Not for migration

- `/api-reference/...` (500+ URLs) — Doxygen-generated API docs. Keep as external subtree on the live site or regenerate from CI; don't hand-port.
- All footer language switchers (es/zh/de/hu/fr) — out of scope for v1.
- External: `https://workflowengine.io/documentation/` — separate docs site (Docusaurus?), linked from the footer, not part of this project.

## Product taxonomy (as framed on the live site)

Three products are cross-sold from workflowengine.io — **important** because our nav/footer need to reflect which ones we own:

1. **Workflow Engine** — embeddable .NET / .NET Core library. Main product for this site.
2. **Workflow Server** — standalone, REST API, Windows/Linux/macOS/Docker. Dedicated page.
3. **DWKit** — low-code platform. Cross-sold but **is a separate product**; unclear whether we should feature it at all on the rewrite. Ask owner.

Plus at the top of the current homepage there's a banner for **FormEngine** (`formengine.io`, form builder). Since we forked from the FormEngine site, this cross-sell link is probably intentional for the OptimaJet family and should be re-added explicitly if desired.

## Social proof / customers

Logos shown on workflowengine.io home: **Dell, ProcessMAP, Techlogix, Airbus, Wolters Kluwer, KPMG, Nelnet, Technocom, MediaOcean, GE Honda Aero Engines, Wine.Create.**

Testimonials quoted (name, title, company):
- Eugene Kouroptev — VP of Product Development, ProcessMAP
- Mark West — CEO, Innovum Technologies
- Márcio Lima — Senior Software Engineer, Wine.Create

Our fork has `CustomerTestimonialsBlock` + `LogosBlock` + `TrustpilotTestimonialsBlock` + `TestimonialsBlock` ready. Logos live under `public/logos/` — most current ones are **FormEngine-era customers**, need to be swapped.

## Mapping to our blocks

| workflowengine.io section | Our block type | Data source |
|---------------------------|----------------|-------------|
| Home hero | `HeroBlock` or `HeroWithCodeBlock` (if we keep a code snippet) | `main.json` |
| Supported Processes (3 cards) | `FeaturesGridBlock` or `IconTitleTextBlock` | `main.json` |
| Core Features | `DetailedFeatureGridBlock` / `FeaturesGridBlock` | `main.json` |
| "Which Product Do I Need?" (3-way comparison) | `ComparisonTable` or `ColumnsBlock` | `main.json` |
| Customers (logos) | `LogosBlock` | `main.json` |
| Testimonials | `CustomerTestimonialsBlock` | `main.json` |
| Contact form | `ContactCTABlock` + `ContactForm` | — |
| Features page — 11 H2 blocks | `TwoColumnFeatureBlock` or `IconTitleTextBlock` repeated | new `features.json` |
| Server page — 6 sections | `TwoColumnFeatureBlock`, `BadgeGridBlock` for benefits | new `server.json` |
| Downloads page — version table + NuGet list | Custom table block (doesn't exist yet — see below) | new `downloads.json` |
| Pricing | `Pricing` + `ComparisonTable` + `FAQBlock` | `pricing-faq.json` |

### Blocks we likely need to add
- A simple **download table block** (product × version × date × link). Could be a generic `TableBlock` — none currently exists. Alternatively, hard-code in `app/downloads/page.tsx`.
- A **package grid block** (NuGet / npm package cards with copy-to-clipboard). `CodePreview` already exists for single commands; multi-package grid is new.

## Blog posts (20 at snapshot)

Existing titles — a mix of thought leadership, case studies, release notes:
*How to choose the right embedded workflow automation tool; Workflow Server Overview; Workflow Automation Explained; How to Speed Up Your Development By 60% With Low Code; New Release of the Workflow Server 3.0; A new Low Code Platform!; What to Look for When Choosing Business Process Management Software; OptimaJet VS Nintex: Pros and Cons; Choosing a Business Rules Management Tool: Six Practical Tips; How to Implement BPM in Your Company?; Workflow features in different industries; WorkflowServer: Integration; Workflow Designer: Customization; Workflow Designer: Integration; Workflow Performance; Workflow Solutions; Workflow Engine & Workflow Server Code Quality; Workflow Server Goes OpenAPI; Workflow Server—a microservice architecture component; Case Study: Workflow Engine for BPM Software.*

Migration options:
1. **Port all 20** — each → MDX file under `src/content/blog/` + entry in `src/data/blog.ts`. Labour-intensive but preserves SEO.
2. **Port top N** by traffic / relevance, redirect the rest to the old site. Requires traffic data.
3. **Skip blog for v1**, keep the empty-blog placeholder ([blog.md](../blog.md)), rebuild content later.

Ask owner for traffic data + strategy before committing.

## Migration phases (confirmed)

**Phase 1 — structure + redirects.** Set up `_redirects` for `/pricing/`, `/agreements/eula/`, `/agreements/csa/` → optimajet.com. Remove `src/app/pricing/` route (now just a redirect target). Remove FormEngine banner references. **Quick.**

**Phase 2 — light-theme rebrand.** Swap Tailwind palette from dark to light. Audit all `bg-slate-900`, `text-white`, etc. tokens across `src/components/` and `src/styles/globals.css`. Keep typography. **1-2 days.**

**Phase 3 — launch-minimum content.** Rewrite `main.json` (home), build `features.json` / `server.json` / `downloads.json` from the snapshotted inventory. Add a new `DownloadsTableBlock` component (or hard-code in `app/downloads/page.tsx`). Wire up Bitrix24 in `ContactForm.tsx`. Refresh logos and testimonials. **This ships the marketing site.**

**Phase 4 — blog (P0, SEO-critical).** Port all 20 posts. Each gets an MDX file in `src/content/blog/` and an entry in `src/data/blog.ts`. **Slugs must match the legacy URLs** — audit the legacy `/blog/<slug>/` paths first, before writing anything, to guarantee 1:1 mapping (no `/blog/workflow-server-overview/` → `/blog/workflow-server/`). Remove the `__placeholder__` sentinel workaround ([blog.md](../blog.md)) once the first post lands.

**Phase 5 — polish.** JSON-LD enrichment, per-page SEO metadata, sitemap/robots audit, 404 check vs legacy URL list (anything we miss must redirect somewhere).

## Owner decisions (2026-04-14)

- **DWKit cross-sell:** keep. The "Which Product Do I Need?" section stays a 3-way comparison (Workflow Engine / Workflow Server / DWKit). DWKit has no dedicated route on our site (matches legacy).
- **FormEngine top banner:** remove. No cross-sell to FormEngine on the new site.
- **Blog:** port **all 20 posts**. Primary goal — preserve SEO traffic. Slugs must match the originals (audit before porting). Each existing URL on workflowengine.io/blog/... must resolve to the same slug on our site.
- **Pricing:** keep the 301-to-optimajet.com pattern the legacy site uses. No own pricing page. Top-nav "Pricing" link goes straight to `https://optimajet.com/products/workflowengine/price/` — or we keep `/pricing/` as a URL owned by us and 301-redirect it via `public/_redirects`. Verified 2026-04-14: legacy site links pricing only from top nav; no hero/footer/inline references.
- **EULA / CSA:** same as pricing — 301-redirect to `optimajet.com/products/workflowengine/{eula,csa}/` via `public/_redirects`. Replicating what workflowengine.io already does. No own legal pages.
- **Visual rebrand:** **light theme**. Keep existing typography (Inter / Poppins / Space Grotesk / JetBrains Mono). Swap the dark background palette for light. Accent color TBD — probably stick with primary blue and adjust surface/text tokens.
