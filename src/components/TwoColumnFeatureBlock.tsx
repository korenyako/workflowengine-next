import React from "react";
import Button from "./Button";
import CodePreview from "./CodePreview";
import IconTitleTextBlock from "./IconTitleTextBlock";

interface GradientButtonProps {
  title: string;
  subtitle: string;
  href: string;
  iconPath?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ title, subtitle, href, iconPath }) => {
  return (
    <a href={href && href.startsWith('/') && href !== '/' && !href.includes('#') && !href.includes('?') && !href.endsWith('/') ? href + '/' : href} className="flex items-center gap-4 hover:opacity-80 transition-opacity duration-200 group w-full sm:w-auto">
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

interface TwoColumnFeatureBlockProps {
  subtitle?: string;
  title: string;
  description: string;
  secondDescription?: string;
  ctaButtons?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  }[];
  gradientButton?: {
    title: string;
    subtitle: string;
    href: string;
    iconPath?: string;
  };
  gradientButtons?: {
    title: string;
    subtitle: string;
    href: string;
    iconPath?: string;
  }[];
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  blockBg?: string;
  customImage?: {
    type: string;
    props: any;
  };
  compactPadding?: boolean;
}

const TwoColumnFeatureBlock: React.FC<TwoColumnFeatureBlockProps> = ({
  subtitle,
  title,
  description,
  secondDescription,
  ctaButtons,
  gradientButton,
  gradientButtons,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  blockBg,
  customImage,
  compactPadding
}) => {
  // Определяем цвета текста на основе фона
  const isLightBg = blockBg === 'white' || blockBg === '#ffffff' || blockBg === '#f8fafc';
  const textColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const subtitleColor = 'text-blue-600';
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-slate-600';

  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1';
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2';

  return (
    <section className={compactPadding ? "py-12" : "py-16 lg:py-24"} style={{ backgroundColor: blockBg }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className={`${contentOrder}`}>
            {subtitle && (
              <h3 className={`text-lg font-subtitle font-semibold tracking-wide ${subtitleColor} mb-4 whitespace-pre-wrap break-words`}>
                {subtitle}
              </h3>
            )}
            <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-heading ${textColor} mb-6 whitespace-pre-wrap break-words`}>
              {title}
            </h2>
                    <p className={`text-lg lg:text-xl ${descriptionColor} mb-8 leading-normal whitespace-pre-wrap break-words`}>
              {description}
            </p>
            {/* Кнопки */}
            {gradientButtons && gradientButtons.length > 0 ? (
              <div className="flex flex-col gap-4">
                {gradientButtons.map((button, index) => (
                  <GradientButton 
                    key={index}
                    title={button.title}
                    subtitle={button.subtitle}
                    href={button.href && button.href.startsWith('/') && button.href !== '/' && !button.href.includes('#') && !button.href.includes('?') && !button.href.endsWith('/') ? button.href + '/' : button.href}
                    iconPath={button.iconPath}
                  />
                ))}
              </div>
            ) : gradientButton ? (
              <GradientButton 
                title={gradientButton.title}
                subtitle={gradientButton.subtitle}
                href={gradientButton.href && gradientButton.href.startsWith('/') && gradientButton.href !== '/' && !gradientButton.href.includes('#') && !gradientButton.href.includes('?') && !gradientButton.href.endsWith('/') ? gradientButton.href + '/' : gradientButton.href}
                iconPath={gradientButton.iconPath}
              />
            ) : ctaButtons && ctaButtons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4">
                {ctaButtons.map((button, index) => (
                  <Button
                    key={index}
                    href={button.href && button.href.startsWith('/') && button.href !== '/' && !button.href.includes('#') && !button.href.includes('?') && !button.href.endsWith('/') ? button.href + '/' : button.href}
                    variant={button.variant || 'primary'}
                    isLightBg={isLightBg}
                    className="w-full sm:w-auto"
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Image or Custom Component */}
          <div className={`${imageOrder}`}>
            {secondDescription && (
              <div className="bg-slate-100 rounded-lg p-4 mb-8 flex items-start gap-3">
                <svg className={`w-5 h-5 ${descriptionColor} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className={`text-sm lg:text-base ${descriptionColor} leading-normal whitespace-pre-wrap break-words`} dangerouslySetInnerHTML={{ __html: secondDescription }}>
                </p>
              </div>
            )}
            <div className="relative">
              {customImage ? (
                <div className="w-full">
                  {customImage.type === 'CodePreview' && (
                    <CodePreview
                      code={customImage.props.code}
                      language={customImage.props.language}
                      tabs={customImage.props.tabs}
                    />
                  )}
                  {customImage.type === 'IconTitleTextBlock' && (
                    <IconTitleTextBlock
                      items={customImage.props.items}
                    />
                  )}
                </div>
              ) : imageSrc && (
                <>
                  {imageSrc.endsWith('.webm') || imageSrc.endsWith('.mp4') ? (
                    <div className="w-full" style={{ padding: '2%' }}>
                      <video
                        src={imageSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto rounded-xl"
                        style={{ transform: 'scale(1.05)', transformOrigin: 'center' }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <img
                      src={imageSrc}
                      alt={imageAlt}
                      width={600}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto rounded-lg p-8"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnFeatureBlock; 