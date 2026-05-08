'use client';

import React from "react";
import Reveal from "./Reveal";
import HeroBlock from "./HeroBlock";
import CenteredImageBlock from "./CenteredImageBlock";
import CenteredVideoBlock from "./CenteredVideoBlock";
import FeaturesGridBlock from "./FeaturesGridBlock";
import DetailedFeatureGridBlock from "./DetailedFeatureGridBlock";
import ProductsGridBlock from "./ProductsGridBlock";
import LogosBlock from "./LogosBlock";
import ContactCTABlock from "./ContactCTABlock";
import CustomerStoryBlock from "./CustomerStoryBlock";
import CompatibilityBlock from "./CompatibilityBlock";
import CustomerTestimonialsBlock from "./CustomerTestimonialsBlock";
import ReviewsStripBlock from "./ReviewsStripBlock";
import DesignerScreenshotBlock from "./DesignerScreenshotBlock";
import ScrollMergedSection from "./ScrollMergedSection";
import blocks from "@/data/main.json";

const components: Record<string, React.ComponentType<any>> = {
  HeroBlock,
  CenteredImageBlock,
  CenteredVideoBlock,
  FeaturesGridBlock,
  DetailedFeatureGridBlock,
  ProductsGridBlock,
  LogosBlock,
  ContactCTABlock,
  CustomerStoryBlock,
  CompatibilityBlock,
  CustomerTestimonialsBlock,
  ReviewsStripBlock,
  DesignerScreenshotBlock,
};

// Slide-card surface: see knowledge/design-rules.md §7.
// Блок оборачивается в rounded-card, если в JSON указан `surface: "card"`.
const isCard = (props: any): boolean => props.surface === 'card';

const renderBlockContent = (block: any) => {
  const { type, props } = block;
  const Component = components[type];
  if (!Component) return null;

  const content = <Component {...props} />;

  return isCard(props) ? (
    <div
      className={`mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64 my-12 lg:my-16 rounded-[40px] lg:rounded-[48px] overflow-hidden ${props.cardBg ? '' : 'bg-slate-100'}`}
      style={props.cardBg ? { backgroundColor: props.cardBg } : undefined}
    >
      {content}
    </div>
  ) : (
    <div className="mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64" style={props.blockBg ? { backgroundColor: props.blockBg } : undefined}>
      {content}
    </div>
  );
};

// For blocks rendered inside a ScrollMergedSection: skip the standard mx-* wrapper
// (the merged section provides its own layout) and render the component directly.
const renderRawBlock = (block: any) => {
  const { type, props } = block;
  const Component = components[type];
  if (!Component) return null;
  return <Component {...props} />;
};

interface BlocksProps {
  revealOnScroll?: boolean;
}

const Blocks: React.FC<BlocksProps> = ({ revealOnScroll = false }) => {
  // Group consecutive blocks where the first has `mergeNext: true` with the next one,
  // so they render under a single ScrollMergedSection with shared scroll-driven bg.
  const groups: { blocks: any[]; startIdx: number }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.props?.mergeNext && i + 1 < blocks.length) {
      groups.push({ blocks: [block, blocks[i + 1]], startIdx: i });
      i++; // skip the consumed sibling
    } else {
      groups.push({ blocks: [block], startIdx: i });
    }
  }

  return (
    <div className="w-full overflow-x-clip flex flex-col">
      {groups.map((group) => {
        const isMerged = group.blocks.length > 1;
        // Hero (startIdx === 0) is above the fold — animating it would just flash.
        const shouldReveal = revealOnScroll && group.startIdx > 0 && !isMerged;

        let node: React.ReactNode;
        if (isMerged) {
          const [topBlock, bottomBlock] = group.blocks;
          const bg = topBlock.props.mergeBg || '#4286F4';
          node = (
            <ScrollMergedSection
              background={bg}
              topSlot={renderRawBlock(topBlock)}
              bottomSlot={renderRawBlock(bottomBlock)}
            />
          );
        } else {
          node = renderBlockContent(group.blocks[0]);
        }

        const key = group.blocks.map((b) => b.type).join('+') + '@' + group.startIdx;

        return (
          <React.Fragment key={key}>
            {shouldReveal ? <Reveal>{node}</Reveal> : node}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Blocks;
