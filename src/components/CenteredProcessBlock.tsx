'use client';

import React from 'react';
import ProcessPreview from './ProcessPreview';

interface Tab {
  name: string;
  type: 'image' | 'code' | 'form';
  content?: string; // для кода
  imageSrc?: string; // для изображений
}

interface CenteredProcessBlockProps {
  subtitle: string;
  title: string;
  description: string;
  tabs: Tab[];
  className?: string;
}

const CenteredProcessBlock: React.FC<CenteredProcessBlockProps> = ({
  subtitle,
  title,
  description,
  tabs,
  className = '',
}) => {
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 py-16 ${className}`}>
      {/* Subtitle */}
      <div className="text-center mb-4">
        <h3 className="text-blue-300 text-lg font-subtitle font-semibold tracking-wide mb-4 whitespace-pre-wrap break-words">
          {subtitle}
        </h3>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white mb-6 whitespace-pre-wrap break-words">
          {title}
        </h2>
      </div>

      {/* Description */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-normal whitespace-pre-wrap break-words">
          {description}
        </p>
      </div>

      {/* ProcessPreview Component */}
      <div className="w-full">
        <ProcessPreview tabs={tabs} />
      </div>
    </div>
  );
};

export default CenteredProcessBlock;
