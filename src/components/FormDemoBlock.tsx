'use client';

import React from 'react';
import Button from './Button';

interface Feature {
  title: string;
  description: string;
}

interface FormDemoBlockProps {
  demoId: string;
  subtitle?: string;
  title: string;
  description: string;
  secondDescription?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  learnMore?: {
    title: string;
    subtitle: string;
    href: string;
    iconPath?: string;
  };
  features?: Feature[];
  imagePosition?: 'left' | 'right';
  layout?: 'two-column' | 'full-width';
}

const FormDemoBlock: React.FC<FormDemoBlockProps> = ({
  subtitle,
  title,
  description,
  secondDescription,
  primaryCta,
  features,
  imagePosition = 'left',
  layout = 'two-column',
}) => {
  if (layout === 'full-width') {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading text-slate-900 mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl lg:text-2xl font-subtitle font-semibold text-blue-600 mb-4">
                {subtitle}
              </p>
            )}
            <p className="text-lg lg:text-xl text-slate-600 leading-normal">
              {description}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-12 text-center text-slate-500">
            Demo placeholder
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

  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1';
  const formOrder = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2';

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className={contentOrder}>
            {subtitle && (
              <h3 className="text-lg font-subtitle font-semibold tracking-wide text-blue-600 mb-4">
                {subtitle}
              </h3>
            )}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading text-slate-900 mb-6">
              {title}
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-normal">
              {description}
            </p>
          </div>
          <div className={formOrder}>
            <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-12 text-center text-slate-500">
              Demo placeholder
            </div>
          </div>
        </div>
        {features && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-start text-left">
                <h3 className="text-base font-subtitle font-semibold tracking-wide text-blue-600 mb-2">
                  {feature.title}
                </h3>
                <p className="text-lg lg:text-xl text-slate-600 leading-normal">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FormDemoBlock;
