'use client';

import React from "react";
import HeroWithCodeBlock from "./HeroWithCodeBlock";
import HeroBlock from "./HeroBlock";
import HeroImageBlock from "./HeroImageBlock";
import CenteredImageBlock from "./CenteredImageBlock";
import CenteredCodeBlock from "./CenteredCodeBlock";
import CenteredVideoBlock from "./CenteredVideoBlock";
import LargeCenteredImageBlock from "./LargeCenteredImageBlock";
import CenteredImagesBlock from "./CenteredImagesBlock";
import CenteredAIBlock from "./CenteredAIBlock";
import TwoColumnFeatureBlock from "./TwoColumnFeatureBlock";
import TwoColumnFeatureFullImageBlock from "./TwoColumnFeatureFullImageBlock";
import ImageTextBlock from "./ImageTextBlock";
import FeaturesGridBlock from "./FeaturesGridBlock";
import DetailedFeatureGridBlock from "./DetailedFeatureGridBlock";
import IconTitleTextBlock from "./IconTitleTextBlock";
import CodeHighlightBlock from "./CodeHighlightBlock";
import CodePreview from "./CodePreview";
import TwoColumnDetailedFeaturesBlock from "./TwoColumnDetailedFeaturesBlock";
import CallToActionBlock from "./CallToActionBlock";
import TestimonialsBlock from "./TestimonialsBlock";
import FAQBlock from "./FAQBlock";
import TrustpilotTestimonialsBlock from "./TrustpilotTestimonialsBlock";
import ProductsGridBlock from "./ProductsGridBlock";
import LogosBlock from "./LogosBlock";
import BadgeGridBlock from "./BadgeGridBlock";
import RatingCTABlock from "./RatingCTABlock";
import ContactCTABlock from "./ContactCTABlock";
import CustomerStoryBlock from "./CustomerStoryBlock";
import CompatibilityBlock from "./CompatibilityBlock";
import CustomerTestimonialsBlock from "./CustomerTestimonialsBlock";
import ReviewsStripBlock from "./ReviewsStripBlock";
import DesignerScreenshotBlock from "./DesignerScreenshotBlock";
import { ComparisonTimeline } from "./ComparisonTimeline";
import ColumnsBlock from "./ColumnsBlock";
import blocks from "@/data/main.json";

const components: Record<string, React.ComponentType<any>> = {
  HeroWithCodeBlock,
  HeroBlock,
  HeroImageBlock,
  CenteredImageBlock,
  CenteredCodeBlock,
  CenteredVideoBlock,
  LargeCenteredImageBlock,
  CenteredImagesBlock,
  CenteredAIBlock,
  TwoColumnFeatureBlock,
  TwoColumnFeatureFullImageBlock,
  ImageTextBlock,
  FeaturesGridBlock,
  DetailedFeatureGridBlock,
  IconTitleTextBlock,
  CodeHighlightBlock,
  CodePreview,
  TwoColumnDetailedFeaturesBlock,
  CallToActionBlock,
  TestimonialsBlock,
  FAQBlock,
  TrustpilotTestimonialsBlock,
  ProductsGridBlock,
  LogosBlock,
  BadgeGridBlock,
  RatingCTABlock,
  ContactCTABlock,
  CustomerStoryBlock,
  CompatibilityBlock,
  CustomerTestimonialsBlock,
  ReviewsStripBlock,
  DesignerScreenshotBlock,
  ComparisonTimeline,
  ColumnsBlock,
};

// Slide-card surface: see knowledge/design-rules.md §7.
// Блок оборачивается в rounded-card, если в JSON указан `surface: "card"`.
const isCard = (props: any): boolean => props.surface === 'card';

const Blocks: React.FC = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {blocks.map((block: any, i: number) => {
        const { type, props } = block;
        const Component = components[type];
        if (!Component) return null;

        const content = <Component {...props} />;

        return (
          <React.Fragment key={type + i}>
            {type === 'LogosBlock' && <div className="h-16" />}
            {isCard(props) ? (
              <div className="mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64 my-6 lg:my-8 bg-slate-100 rounded-[40px] lg:rounded-[48px] overflow-hidden">
                {content}
              </div>
            ) : (
              <div style={props.blockBg ? { backgroundColor: props.blockBg } : undefined}>
                {content}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Blocks; 