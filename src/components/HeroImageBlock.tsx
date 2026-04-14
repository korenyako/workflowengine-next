import React from "react";
import Button from "./Button";

interface HeroImageBlockProps {
  title?: string;
  description?: string;
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
  note?: string;
  blockBg?: string;
}

const HeroImageBlock: React.FC<HeroImageBlockProps> = ({
  title,
  description,
  image,
  primaryCta,
  secondaryCta,
  note,
  blockBg,
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-slate-600';
  const noteColor = isLightBg ? 'text-slate-500' : 'text-slate-500';

  return (
    <section className="pt-16 pb-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        {title && (
          <div className="text-center mb-12">
            <h2 className={`font-bold mb-6 ${titleColor} whitespace-pre-wrap break-words`}>
              {title}
            </h2>
          </div>
        )}
        
        {/* Большая картинка - LCP element */}
        <div className="flex justify-center">
          <img
            src={image.src}
            alt={image.alt}
            width={1200}
            height={675}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="max-w-full h-auto rounded-xl object-contain"
          />
        </div>
        
        {/* Описание */}
        {description && (
          <div className="text-center mb-12">
            <p className={`text-lg sm:text-xl max-w-4xl mx-auto mb-8 ${descriptionColor} whitespace-pre-wrap break-words`}>
              {description}
            </p>
          </div>
        )}
        
        {/* Кнопки */}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            {primaryCta && (
              <Button href={primaryCta.href} variant="primary" size="lg">
                {primaryCta.text}
              </Button>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className={`px-8 py-3 text-lg border font-semibold rounded-lg transition ${
                  isLightBg 
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                    : 'border-white text-slate-900 hover:bg-white hover:text-gray-900'
                }`}
              >
                {secondaryCta.text}
              </a>
            )}
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

export default HeroImageBlock; 