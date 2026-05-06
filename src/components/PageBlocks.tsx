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

interface BlockData {
  type: string;
  props: Record<string, any>;
}

interface PageBlocksProps {
  blocks: BlockData[];
  revealOnScroll?: boolean;
}

// Slide-card surface: см. knowledge/design-rules.md §7.
const isCard = (props: Record<string, any>): boolean => props.surface === 'card';

const PageBlocks: React.FC<PageBlocksProps> = ({ blocks, revealOnScroll = false }) => {
  return (
    <div className="w-full overflow-x-clip flex flex-col">
      {blocks.map((block: BlockData, i: number) => {
        const { type, props } = block;
        const Component = components[type];
        if (!Component) {
          console.warn(`Component "${type}" not found`);
          return null;
        }

        const content = <Component {...props} />;

        const wrapped = isCard(props) ? (
          <div className="mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64 my-12 lg:my-16 bg-slate-100 rounded-[40px] lg:rounded-[48px] overflow-hidden">
            {content}
          </div>
        ) : (
          <div className="mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64" style={props.blockBg ? { backgroundColor: props.blockBg } : undefined}>
            {content}
          </div>
        );

        // Hero (first block) is above the fold and doesn't benefit from reveal —
        // animating it just causes a flash on initial paint.
        const shouldReveal = revealOnScroll && i > 0;

        return (
          <React.Fragment key={type + i}>
            {shouldReveal ? <Reveal>{wrapped}</Reveal> : wrapped}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PageBlocks;
