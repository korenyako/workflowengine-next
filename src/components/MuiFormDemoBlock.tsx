'use client';

import React from 'react';
import Button from './Button';

interface MuiFormDemoBlockProps {
  demoId: string;
  subtitle?: string;
  title?: string;
  description?: string;
  secondDescription?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  layout?: 'two-column' | 'full-width';
}

const DemoPlaceholder: React.FC = () => (
  <div className="flex items-center justify-center rounded-lg border border-slate-300 bg-slate-100 p-8 min-h-[200px]">
    <span className="text-slate-500 text-lg">Demo placeholder</span>
  </div>
);

const MuiFormDemoBlock: React.FC<MuiFormDemoBlockProps> = ({
  demoId,
  subtitle,
  title,
  description,
  secondDescription,
  primaryCta,
  layout = 'full-width',
}) => {
  if (layout === 'full-width') {
    return (
      <section className={title ? "py-16 lg:py-24" : ""}>
        <div className="max-w-6xl mx-auto">
          {title && (
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-slate-900 mb-4">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xl lg:text-2xl font-subtitle font-semibold text-blue-600 mb-4">
                  {subtitle}
                </p>
              )}
              {description && (
                <p className="text-lg lg:text-xl text-slate-600 leading-normal">
                  {description}
                </p>
              )}
            </div>
          )}
          <div id={`fe-${demoId}-demo`}>
            <DemoPlaceholder />
          </div>
          {secondDescription && (
            <p className="text-lg lg:text-xl text-slate-600 leading-normal text-center mt-8">
              {secondDescription}
            </p>
          )}
          {primaryCta && (
            <div className="mt-8 flex justify-center">
              <Button href={primaryCta.href} variant="primary" size="lg">
                {primaryCta.text}
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            {subtitle && (
              <h3 className="text-lg font-subtitle font-semibold tracking-wide text-blue-600 mb-4">
                {subtitle}
              </h3>
            )}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-slate-900 mb-6">
              {title}
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-normal">
              {description}
            </p>
          </div>
          <div id={`fe-${demoId}-demo`}>
            <DemoPlaceholder />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MuiFormDemoBlock;
