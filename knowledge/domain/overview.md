---
title: Domain overview
---

# Domain overview

The site sells / documents the **OptimaJet WorkflowEngine** product family. This is a public-facing marketing site only — no product logic lives here.

## What WorkflowEngine is (as framed on this site)

A **.NET workflow automation engine** — a library for designing, automating, and executing business processes. Visual workflow designer, flexible API, cross-platform (.NET runtime). Tagline used in metadata: *"Lightweight, cross-platform workflow engine for .NET."*

**Closed-source, commercial product.** Unlike its sibling FormEngine (whose Core is MIT-licensed and lives on GitHub), WorkflowEngine is proprietary. Distributed via NuGet packages + direct downloads. **No GitHub repo, no "star us", no MIT positioning** anywhere on the site — if you see such copy leftover from the FormEngine fork, strip it.

## Product surface on the site

Planned routes corresponding to product lines (most are stubs after the fork):

- **`/features/`** — what the engine does (rules, scheme designer, persistence, etc.). Stub.
- **`/server/`** — **Workflow Server**, a ready-to-run workflow management application built on WorkflowEngine. Stub.
- **`/downloads/`** — packages, installers, source bundles. Stub.
- **`/pricing/`** — license tiers. Live but still rendering FormEngine-era content.
- **`/contacts/`** — sales + support contact. Live; form currently stubbed.
- **`/blog/`** — product announcements, tutorials, case studies. Empty.

Plus external: `https://workflowengine.io/documentation/` — the real technical docs (not part of this repo).

## Owner / vendor

**OptimaJet Limited**. Corporate info, address, phone, email baked into [Footer.tsx](../../src/components/Footer.tsx) (`companyInfo`).

- GitHub org: [optimajet](https://github.com/optimajet)
- NuGet package: `OptimaJet.WorkflowEngine.Core`
- Company site: [optimajet.com](https://optimajet.com/)

## Relationship to FormEngine

This site is a **fork** of the FormEngine marketing site ([C:/Work/Optimajet/formengine-next](../../../formengine-next)). FormEngine is a separate product (React form builder). Both share the OptimaJet vendor. Fork rationale in [decisions.md](../decisions.md#7-fork-strategy-clean-repo-not-git-fork).

FormEngine-era concepts you will still see in code / JSON data that should not be shipped:
- `@react-form-builder/*` npm commands in block copy
- MUI / Mantine / Shadcn "component library" blocks
- React Hook Form / TanStack / Formik comparison pages (routes deleted, footer links removed, block data still references them)
