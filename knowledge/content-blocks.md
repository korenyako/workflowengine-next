---
title: Content block system
---

# Content block system

Pages are composed of **blocks** — typed React components rendered from JSON config. A lightweight file-based CMS.

## How it works

1. JSON file in `src/data/` ([main.json](../src/data/main.json), [features.json](../src/data/features.json), [server.json](../src/data/server.json)) defines an array of `{ type, props }` objects.
2. [components/blocks.tsx](../src/components/blocks.tsx) maintains a `components: Record<string, React.ComponentType>` registry mapping `type` strings to block components. It is the renderer for `main.json` (home).
3. [components/PageBlocks.tsx](../src/components/PageBlocks.tsx) is the same renderer pattern, used by `/features` and `/server` (and any future data-driven sub-page).
4. Both renderers iterate blocks, look up the component by `type`, pass `props`. Unknown types are silently dropped in `blocks.tsx`; `PageBlocks.tsx` logs a `console.warn`.

## Current registry (13 blocks)

Both `blocks.tsx` and `PageBlocks.tsx` register the same set:

`HeroBlock`, `CenteredImageBlock`, `CenteredVideoBlock`, `FeaturesGridBlock`, `DetailedFeatureGridBlock`, `ProductsGridBlock`, `LogosBlock`, `ContactCTABlock`, `CustomerStoryBlock`, `CompatibilityBlock`, `CustomerTestimonialsBlock`, `ReviewsStripBlock`, `DesignerScreenshotBlock`.

If you need a block that existed in the FormEngine fork (e.g. `HeroWithCodeBlock`, `TwoColumnFeatureBlock`, `FAQBlock`, `IconTitleTextBlock`, `CodePreview`, `BadgeGridBlock`, …) — copy it back from `../formengine-next` and register it. They were removed in the post-fork cleanup (see [log.md](log.md) `2026-04-29` entry) since none of the current JSON files referenced them.

## Surface card wrapping

Both `blocks.tsx` and `PageBlocks.tsx` apply a uniform card wrapper when `props.surface === "card"`: `mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64 my-6 lg:my-8 bg-slate-100 rounded-[40px] lg:rounded-[48px] overflow-hidden`. The same `mx-*` chain is duplicated on `ContactCTABlock` and `FooterBlock` — these three locations must stay synchronized, otherwise the CTA↔Footer notch effect breaks horizontally.

## Layout hooks

`blocks.tsx` adds a vertical spacer before `LogosBlock`. Block-level background: `props.blockBg` overrides default `transparent`.

## Adding a new block

1. Create the component in `src/components/MyBlock.tsx`.
2. Import + register it in **both** `blocks.tsx` and `PageBlocks.tsx`. Keep imports alphabetical inside the registry to make diffs predictable.
3. Reference it from the relevant JSON: `{ "type": "MyBlock", "props": { ... } }`.
4. If the block needs to sit inside a slate-100 rounded card, add `"surface": "card"` to its props.
