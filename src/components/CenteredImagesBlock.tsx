import React from "react";
import Button from "./Button";

interface CenteredImagesBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  secondDescription?: string;
  images: {
    src: string;
    alt: string;
  }[];
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  gradientButton?: {
    title: string;
    subtitle: string;
    href: string;
    iconPath?: string;
  };
  note?: string;
  blockBg?: string;
  noBottomMargin?: boolean;
}

const CenteredImagesBlock: React.FC<CenteredImagesBlockProps> = ({
  title,
  subtitle,
  description,
  secondDescription,
  images,
  primaryCta,
  secondaryCta,
  gradientButton,
  note,
  blockBg,
  noBottomMargin,
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const subtitleColor = 'text-blue-600'; // Всегда синий для subtitle
  const textColor = isLightBg ? 'text-gray-600' : 'text-slate-600';
  const noteColor = isLightBg ? 'text-slate-500' : 'text-slate-500';

  return (
    <section className={`pt-8 lg:pt-16 px-4 sm:px-8 ${noBottomMargin ? 'pb-0' : 'pb-8 lg:pb-16'}`}>
      <div className="max-w-6xl mx-auto text-center">
        {/* Бейдж Components */}
        {title && title.includes('WorkflowEngine React Form Components Library') && (
          <div className="mb-6 px-4 py-2 rounded-full text-base font-semibold text-slate-900 border-2 border-gray-300 inline-block">
            Components
          </div>
        )}
        
        {/* Заголовок */}
        <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-heading ${titleColor} mb-6 whitespace-pre-wrap break-words`}>
          {title}
        </h2>
        
        {/* Подзаголовок */}
        {subtitle && (
          <h3 className="text-blue-600 text-lg font-subtitle font-semibold tracking-wide mb-4 whitespace-pre-wrap break-words">
            {subtitle}
          </h3>
        )}
        
        {/* Описание */}
        <p className={`text-lg lg:text-xl mb-8 lg:mb-16 leading-normal ${textColor} whitespace-pre-wrap break-words`}>
          {description}
        </p>
        
        {/* Три изображения - lazy loaded as below fold */}
        <div className="mb-8 lg:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {images.map((image, index) => (
              <div key={index} className="flex justify-center items-start">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-full rounded-xl object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Второе описание */}
        {secondDescription && (
          <p className={`text-lg lg:text-xl mb-8 leading-normal ${textColor} whitespace-pre-wrap break-words`}>
            {secondDescription}
          </p>
        )}
        
        {/* Primary кнопка */}
        {primaryCta && (
          <div className="flex justify-center">
            <Button href={primaryCta.href} variant="primary" size="lg" isLightBg={isLightBg} className="w-full sm:w-auto">
              {primaryCta.text}
            </Button>
          </div>
        )}
        
        {/* Заметка */}
        {note && (
          <div className="text-center">
            <p className={`text-sm ${noteColor} whitespace-pre-wrap break-words`}>{note}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CenteredImagesBlock;