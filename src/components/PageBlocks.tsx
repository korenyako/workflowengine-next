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
import CustomerTestimonialsBlock from "./CustomerTestimonialsBlock";
import { ComparisonTimeline } from "./ComparisonTimeline";
import ColumnsBlock from "./ColumnsBlock";
import WorkflowEngineComponentsBlock from "./WorkflowEngineComponentsBlock";
import { ComponentsTableBlock } from "./ComponentsTableBlock";
import ArchitectureBlock from "./ArchitectureBlock";
import DesignerTree from "./DesignerTree";
import { ComponentsTable } from "./ComponentsTable";
import FrameworkLogosBlock from "./FrameworkLogosBlock";
import HeroFrameworksBlock from "./HeroFrameworksBlock";
import HowToUseBlock from "./HowToUseBlock";
import BundleSizeTableBlock from "./BundleSizeTableBlock";
import MUIInstallationBlock from "./MUIInstallationBlock";
import MUIBasicUsageBlock from "./MUIBasicUsageBlock";
import MUIComponentsListBlock from "./MUIComponentsListBlock";
import MUIDocsSupportBlock from "./MUIDocsSupportBlock";
import MantineInstallationBlock from "./MantineInstallationBlock";
import MantineBasicUsageBlock from "./MantineBasicUsageBlock";
import MantineComponentsListBlock from "./MantineComponentsListBlock";
import MantineDocsSupportBlock from "./MantineDocsSupportBlock";
import ShadcnInstallationBlock from "./ShadcnInstallationBlock";
import ShadcnBasicUsageBlock from "./ShadcnBasicUsageBlock";
import ShadcnComponentsListBlock from "./ShadcnComponentsListBlock";
import ShadcnDocsSupportBlock from "./ShadcnDocsSupportBlock";
import MuiFormDemoBlock from "./MuiFormDemoBlock";

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
  CustomerTestimonialsBlock,
  ComparisonTimeline,
  ColumnsBlock,
  WorkflowEngineComponentsBlock,
  ComponentsTableBlock,
  ArchitectureBlock,
  DesignerTree,
  ComponentsTable,
  FrameworkLogosBlock,
  HeroFrameworksBlock,
  HowToUseBlock,
  BundleSizeTableBlock,
  MUIInstallationBlock,
  MUIBasicUsageBlock,
  MUIComponentsListBlock,
  MUIDocsSupportBlock,
  MantineInstallationBlock,
  MantineBasicUsageBlock,
  MantineComponentsListBlock,
  MantineDocsSupportBlock,
  ShadcnInstallationBlock,
  ShadcnBasicUsageBlock,
  ShadcnComponentsListBlock,
  ShadcnDocsSupportBlock,
  MuiFormDemoBlock,
};

interface BlockData {
  type: string;
  props: Record<string, any>;
}

interface PageBlocksProps {
  blocks: BlockData[];
}

// Функция для определения цвета фона блока
const getBlockBackgroundColor = (index: number, total: number, blockType: string, props: any): string => {
  if (props.blockBg) {
    return props.blockBg;
  }

  // По умолчанию все блоки имеют прозрачный фон
  return 'transparent';
};

const PageBlocks: React.FC<PageBlocksProps> = ({ blocks }) => {
  return (
    <>
      {/* Основной контент */}
      <div className="w-full overflow-x-hidden">
        {blocks.map((block: BlockData, i: number) => {
          const { type, props } = block;
          const Component = components[type];
          if (!Component) {
            console.warn(`Component "${type}" not found`);
            return null;
          }

          const backgroundColor = getBlockBackgroundColor(i, blocks.length, type, props);

          return (
            <React.Fragment key={type + i}>
              {/* Отступ перед LogosBlock */}
              {type === 'LogosBlock' && (
                <div className="h-16"></div>
              )}
              <div style={{ backgroundColor }} className="w-full overflow-x-hidden">
                <Component {...props} />
              </div>
              {/* Отступы после блоков */}
              {type === 'CenteredImagesBlock' && (
                <div className="h-16"></div>
              )}
              {type === 'FAQBlock' && (
                <div className="h-16"></div>
              )}
              {type === 'CustomerTestimonialsBlock' && (
                <div className="h-16"></div>
              )}
              {type === 'ContactCTABlock' && (
                <div className="h-16"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default PageBlocks;
