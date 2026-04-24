import React from "react";
import Button from "./Button";

interface GradientButtonProps {
  title: string;
  subtitle: string;
  href: string;
  iconPath?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ title, subtitle, href, iconPath }) => {
  return (
    <a href={href} className="flex items-center gap-4 hover:opacity-80 transition-opacity duration-200 group w-full sm:w-auto">
      {/* Градиентная кнопка с иконкой */}
      <div className="w-12 h-12 bg-gradient-to-r from-[#93d8ff] to-[#85afff] rounded-lg flex items-center justify-center flex-shrink-0">
        {iconPath && (
          <img 
            src={iconPath} 
            alt="" 
            className="w-6 h-6"
          />
        )}
      </div>
      
      {/* Текстовый блок */}
      <div className="flex flex-col justify-center min-h-[52px]">
        <div className="text-slate-900 font-body font-semibold text-xl mb-1">{title}</div>
        <div className="text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center gap-2 text-lg">
          {subtitle.replace(' →', '')}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
            {/* Стрелка влево (по умолчанию) */}
            <path 
              d="m8.25 4.5 7.5 7.5-7.5 7.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-opacity duration-200 group-hover:opacity-0"
            />
            {/* Стрелка вправо (при наведении) */}
            <path 
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-opacity duration-200 opacity-0 group-hover:opacity-100 absolute"
            />
          </svg>
        </div>
      </div>
    </a>
  );
};

interface LargeCenteredImageBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  secondDescription?: string;
  image: {
    src: string;
    alt: string;
  };
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
}

const LargeCenteredImageBlock: React.FC<LargeCenteredImageBlockProps> = ({
  title,
  subtitle,
  description,
  secondDescription,
  image,
  primaryCta,
  secondaryCta,
  gradientButton,
  note,
  blockBg,
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const subtitleColor = 'text-blue-600'; // Всегда синий для subtitle
  const textColor = isLightBg ? 'text-gray-600' : 'text-slate-600';
  const noteColor = isLightBg ? 'text-slate-500' : 'text-slate-500';

  return (
    <section className="py-8 lg:py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Бейдж Form Builder */}
        {title.includes('WorkflowEngine React Form Builder Library') && (
          <div className="mb-6 px-4 py-2 rounded-full text-base font-semibold text-gray-800 bg-gradient-to-r from-[#93d8ff] to-[#85afff] inline-block">
            Form Builder
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
        
        {/* Картинка - lazy loaded as below fold */}
        <div className="mb-8">
          <a href="/react-form-builder-library/" className="inline-block cursor-pointer">
            <img
              src={image.src}
              alt={image.alt}
              width={1200}
              height={675}
              loading="lazy"
              decoding="async"
              className="w-full max-w-full h-auto rounded-xl mx-auto"
            />
          </a>
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

export default LargeCenteredImageBlock;