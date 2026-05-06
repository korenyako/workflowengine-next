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

interface BlocksProps {
  revealOnScroll?: boolean;
}

const Blocks: React.FC<BlocksProps> = ({ revealOnScroll = false }) => {
  return (
    <div className="w-full overflow-x-clip flex flex-col">
      {blocks.map((block: any, i: number) => {
        const { type, props } = block;
        const Component = components[type];
        if (!Component) return null;

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

        // Hero (i === 0) is above the fold — animating it just causes a flash.
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

export default Blocks;
