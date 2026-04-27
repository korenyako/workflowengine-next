---
title: Content block system
---

# Content block system

Pages are composed of **blocks** — typed React components rendered from JSON config. A lightweight file-based CMS.

## How it works

1. JSON file in `src/data/` (e.g. [main.json](../src/data/main.json)) defines an array of `{ type, props }` objects.
2. [components/blocks.tsx](../src/components/blocks.tsx) maintains a `components: Record<string, React.ComponentType>` registry mapping `type` strings to block components.
3. Renderer iterates blocks, looks up the component by `type`, passes `props`. **Unknown types are silently dropped** (`if (!Component) return null`).
4. A similar but larger registry lives in [components/PageBlocks.tsx](../src/components/PageBlocks.tsx) (used for data-driven sub-pages).

## Current registry (blocks.tsx — homepage)

`HeroWithCodeBlock`, `HeroBlock`, `HeroImageBlock`, `CenteredImageBlock`, `CenteredCodeBlock`, `CenteredVideoBlock`, `LargeCenteredImageBlock`, `CenteredImagesBlock`, `CenteredAIBlock`, `TwoColumnFeatureBlock`, `TwoColumnFeatureFullImageBlock`, `ImageTextBlock`, `FeaturesGridBlock`, `DetailedFeatureGridBlock`, `IconTitleTextBlock`, `CodeHighlightBlock`, `CodePreview`, `TwoColumnDetailedFeaturesBlock`, `CallToActionBlock`, `TestimonialsBlock`, `FAQBlock`, `TrustpilotTestimonialsBlock`, `ProductsGridBlock`, `LogosBlock`, `BadgeGridBlock`, `RatingCTABlock`, `ContactCTABlock`, `CustomerStoryBlock`, `CompatibilityBlock`, `CustomerTestimonialsBlock`, `ReviewsStripBlock`, `ComparisonTimeline`, `ColumnsBlock`, `DesignerScreenshotBlock`.

`PageBlocks.tsx` additionally registers: `ArchitectureBlock`, `DesignerTree`, `ComponentsTable`, `FrameworkLogosBlock`, `HeroFrameworksBlock`, `BundleSizeTableBlock`, plus the MUI/Mantine/Shadcn stubs. Both registries also include `CustomerStoryBlock` and `CompatibilityBlock`.

## Surface card wrapping

Both `blocks.tsx` and `PageBlocks.tsx` apply a uniform card wrapper when `props.surface === "card"`: `mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64 my-6 lg:my-8 bg-slate-100 rounded-[40px] lg:rounded-[48px] overflow-hidden`. The same `mx-*` chain is duplicated on `ContactCTABlock` и `FooterBlock` — these three locations must stay synchronized, otherwise the CTA↔Footer notch effect breaks horizontally.

## Layout hooks

`blocks.tsx` adds vertical spacers before `LogosBlock` and after `CenteredImagesBlock`, `FAQBlock`, `CustomerTestimonialsBlock`, `ContactCTABlock`. Block-level background: `props.blockBg` overrides default `transparent`.

## Known limitations (post-fork)

- Many blocks still contain FormEngine-specific copy / links to deleted routes (`/react-form-library`, `/comparison/...`, etc.). See [plans/roadmap.md](plans/roadmap.md).
- `src/data/main.json` still references `StarsWall` (silently dropped, component deleted) and `FormDemoBlock` (rendered as placeholder — see [decisions.md](decisions.md)).
- Sub-page JSON data files (`core.json`, `designer.json`, `core-mantine.json`, `core-mui.json`, `core-shadcn.json`, `rsuite-page.json`, `rsuite.json`) are leftovers from FormEngine — **no live route currently consumes them**.
