---
title: Domain overview
---

# Domain overview

The site sells / documents the **Workflow Engine by Optimajet** product family.
This is a public-facing marketing site only — no product logic lives here.

## Naming conventions

When you write copy or read existing copy, keep these distinctions in mind
(they're enforced in `public/llms.txt` for AI agents and the same rule applies
in marketing content):

- **"Workflow Engine"** (two words, capitalized) = the Optimajet product.
- **"workflow engine"** (two words, lowercase) = the generic technical category
  (state machines, BPMN engines, etc.).
- **"WorkflowEngine"** (one word, CamelCase) = code-only — NuGet package names
  (`WorkflowEngine.NETCore-Core`), the GitHub repo (`WorkflowEngine.NET`),
  namespaces.
- On first mention in titles / hero copy / SEO, prefer **"Workflow Engine by
  Optimajet"** so search engines and LLMs disambiguate from the generic term.
  Subsequent mentions inside the same paragraph can drop to "Workflow Engine".

## Product family

There are **four** members under the Workflow Engine umbrella plus the Designer
component shipped with all of them. Don't conflate them.

| Product | What it is | Distribution | License |
|---|---|---|---|
| **Workflow Engine** (base) | Embeddable .NET library — developers add it as a NuGet package and call its API from their own .NET app. Targets `netstandard2.0`; SQLite provider targets `.NET 6.0`. | NuGet (`WorkflowEngine.NETCore-Core` etc.), GitHub repo, .zip download | Commercial EULA, source-available (not OSI-approved open source) |
| **Workflow Engine Community Edition** | Same library, free tier with usage limits. For evaluation and small projects. | Same NuGet packages | Free with limits |
| **Workflow Engine NEO** | Same library starting from v19.0.0 with extra licensed features for SaaS builders: Data API, RPC API, multitenancy, Forms (via the Forms Plugin). NEO and base are technically one codebase — non-NEO customers can update versions but NEO features are gated by license. | Same NuGet packages, NEO features key-gated | Commercial NEO license |
| **Workflow Server** | Standalone, docker-ready application built on Workflow Engine. HTTP API, admin console, built-in user/role system, OpenID. Turnkey workflow tool, regardless of customer's stack. | Self-hosted binary / Docker image | Separate commercial license |
| **Workflow Engine Designer** (HTML5) | UI component for designing workflow schemes visually. Vanilla JS with React / Angular / Blazor wrappers. Shipped with all four products. | NPM (`@optimajet/workflow-designer*`) | Bundled |

**Latest stable version**: `21.0.0`.
**Source**: `https://github.com/optimajet/WorkflowEngine.NET` (source-available).

## Site routes (current state)

| Route | Status | What it shows |
|---|---|---|
| `/` | Live | Marketing home — Hero, designer screenshot, use-cases tabs, testimonial, features grid, customer story (B.F. Saul moved to /features/), product picker (Engine vs Server), customer story (LKS Next), logos, reviews, ContactCTA |
| `/features/` | Live | Workflow Engine feature surface — benefits, HTML5 Designer, B.F. Saul case study, core components (activities/transitions/actions/actors/commands/timers), testimonial, version control, parallel workflows, runtime essentials, .NET stack compatibility |
| `/server/` | Live | Workflow Server overview, API (dark theme — Workflow API + Callback API), deployment specs |
| `/downloads/` | Live | Latest version, Engine card with download buttons, sample download, Workflow Server card, Designer NPM packages, DB providers |
| `/contacts/` | Live | Contact form (Bitrix24 integration) |
| `/blog/` | Live (with sentinel) | MDX blog index. List has 31 ported posts; some referenced slugs (`bf-saul`, `lks-next`) don't yet have MDX files |
| `/agreements/policy/` | Live | Privacy policy (verbatim from workflowengine.io) |
| `/pricing/` | Removed | Now redirects to `optimajet.com/products/workflowengine/price/` (handled by `_redirects`) |

External: `https://workflowengine.io/documentation/` is the real Docusaurus
docs (out of repo, separate site). When wee link to docs from this site,
those are out-bound external links.

## Owner / vendor

**Optimajet Limited**. Corporate info, address, phone, email baked into
[FooterBlock.tsx](../../src/components/FooterBlock.tsx) (`companyInfo` from
[Footer.tsx](../../src/components/Footer.tsx)).

- GitHub org: [optimajet](https://github.com/optimajet)
- NuGet packages: `WorkflowEngine.NETCore-Core` and database providers
- Company site: [optimajet.com](https://optimajet.com/)
- AI / LLM crawlers: see [public/llms.txt](../../public/llms.txt) +
  [public/llms-full.txt](../../public/llms-full.txt) — the curated, link-verified
  index following the [llmstxt.org](https://llmstxt.org) standard.

## Relationship to FormEngine

This site started as a **fork** of the FormEngine marketing site
([C:/Work/Optimajet/formengine-next](../../../formengine-next)). FormEngine is
a separate Optimajet product (React form builder) with its own license.

The two products **integrate** through Workflow Engine NEO's Forms Plugin —
NEO can use FormEngine to render forms tied to workflow steps. That's the only
product-level connection.

Marketing-wise the sites are independent. Concretely:

- FormEngine Core ships as MIT-licensed; Workflow Engine is **not** open source
  (commercial EULA, source-available). Don't carry over FormEngine's "star us
  on GitHub" framing, MIT badges, or open-source positioning.
- FormEngine-era artifacts you may still see in code/JSON that should NOT ship:
  `@react-form-builder/*` references, MUI / Mantine / Shadcn comparison blocks,
  React Hook Form / TanStack / Formik comparison pages.

Fork rationale: see [decisions.md §7](../decisions.md#7-fork-strategy-clean-repo-not-git-fork).
