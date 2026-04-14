import React from "react";
import Button from "./Button";
import ChatGPTButton from "./ChatGPTButton";

interface CenteredAIBlockProps {
  title: string;
  subtitle?: string;
  description: string;
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
    showIcon?: boolean;
  };
  note?: string;
  blockBg?: string;
  anchor?: string;
  chatGPTButton?: {
    placeholder?: string;
    onClick?: () => void;
    href?: string;
  };
}

const CenteredAIBlock: React.FC<CenteredAIBlockProps> = ({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  gradientButton,
  note,
  blockBg,
  anchor,
  chatGPTButton,
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const subtitleColor = 'text-blue-600'; // Всегда синий для subtitle
  const textColor = isLightBg ? 'text-gray-600' : 'text-slate-600';
  const noteColor = isLightBg ? 'text-slate-500' : 'text-slate-500';

  return (
    <section 
      className="py-8 lg:py-16 px-4 sm:px-8"
      id={anchor}
      style={anchor ? { scrollMarginTop: '100px' } : {}}
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Подзаголовок */}
        {subtitle && (
          <h3 className="text-blue-600 text-lg font-subtitle font-semibold tracking-wide mb-4 whitespace-pre-wrap break-words">
            {subtitle}
          </h3>
        )}
        
        {/* Заголовок */}
        <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-heading font-bold ${titleColor} mb-6 whitespace-pre-wrap break-words`}>
          {title}
        </h2>
        
        {/* Описание */}
        <p className={`text-lg lg:text-xl mb-8 lg:mb-16 leading-normal ${textColor} whitespace-pre-wrap break-words`}>
          {description}
        </p>
        
        {/* ChatGPT кнопка */}
        {chatGPTButton && (
          <div className="mb-6">
            <ChatGPTButton 
              placeholder={chatGPTButton.placeholder}
              onClick={chatGPTButton.onClick}
              href={chatGPTButton.href}
            />
          </div>
        )}
        
        {/* Кнопки */}
        {gradientButton ? (
          <div className="flex justify-center">
            <GradientButton 
              title={gradientButton.title}
              subtitle={gradientButton.subtitle}
              href={gradientButton.href && gradientButton.href.startsWith('/') && gradientButton.href !== '/' && !gradientButton.href.includes('#') && !gradientButton.href.includes('?') && !gradientButton.href.endsWith('/') ? gradientButton.href + '/' : gradientButton.href}
              iconPath={gradientButton.iconPath}
              showIcon={gradientButton.showIcon}
            />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            {primaryCta && (
              <div className="relative inline-block group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 group-hover:bg-white rounded-lg p-0.5 transition-colors duration-200">
                  <div className="bg-[#0d1117] rounded-lg h-full w-full"></div>
                </div>
                <Button 
                  href={primaryCta.href && primaryCta.href.startsWith('/') && primaryCta.href !== '/' && !primaryCta.href.includes('#') && !primaryCta.href.includes('?') && !primaryCta.href.endsWith('/') ? primaryCta.href + '/' : primaryCta.href} 
                  variant="outline-white" 
                  size="lg"
                  className="relative border-0 bg-transparent"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" viewBox="-0.5 -0.5 14 14">
                      <path d="M6.510291666666667 8.788541666666669 4.522916666666667 7.653750000000001m1.9873750000000003 1.1353333333333335 1.9770833333333335 -1.1532083333333334m-1.9770833333333335 1.15375L4.974125000000001 9.685l-2.8145000000000002 -1.6250000000000002a2.7300000000000004 2.7300000000000004 0 0 1 -0.38675000000000004 -0.26975000000000005m2.750041666666667 -0.1365L2.979166666666667 6.770833333333334v-3.2500000000000004c0 -0.16033333333333336 0.014083333333333335 -0.316875 0.040625 -0.46962500000000007m1.5031250000000003 4.602000000000001 -0.00975 -2.2885416666666667m3.23375 -3.603166666666667a2.7088750000000004 2.7088750000000004 0 0 0 -4.727125000000001 1.2891666666666668m4.727125000000001 -1.2891666666666668a2.701833333333334 2.701833333333334 0 0 0 -0.42737500000000006 0.19987500000000002l-2.8145000000000002 1.6250000000000002 0.008125 1.7782916666666668m3.23375 -3.603166666666667a2.7088750000000004 2.7088750000000004 0 0 1 3.4802083333333336 3.448791666666667M3.0197916666666673 3.0512083333333337a2.7088750000000004 2.7088750000000004 0 0 0 -1.246916666666667 4.7385m4.716833333333334 -3.5782500000000006 1.9873750000000003 1.1353333333333335m-1.987916666666667 -1.1353333333333335L4.512083333333334 5.364666666666667m1.9770833333333335 -1.1532083333333334 1.536166666666667 -0.8959166666666667 2.8145000000000002 1.6250000000000002c0.1386666666666667 0.08016666666666668 0.26758333333333334 0.17062500000000003 0.38675000000000004 0.26975000000000005m-2.750041666666667 0.1365L10.020833333333334 6.229166666666668v3.2500000000000004c0 0.16033333333333336 -0.014083333333333335 0.316875 -0.040625 0.46962500000000007M8.477083333333335 5.346791666666667l0.00975 2.2885416666666667m-3.23375 3.603166666666667a2.7088750000000004 2.7088750000000004 0 0 0 4.727125000000001 -1.2891666666666668m-4.727125000000001 1.2891666666666668a2.7300000000000004 2.7300000000000004 0 0 0 0.42737500000000006 -0.19987500000000002l2.8145000000000002 -1.6250000000000002 -0.008125 -1.7782916666666668m-3.23375 3.603166666666667a2.7088750000000004 2.7088750000000004 0 0 1 -3.4802083333333336 -3.448791666666667m8.207333333333334 2.1590833333333337a2.7088750000000004 2.7088750000000004 0 0 0 1.246916666666667 -4.7385"/>
                    </svg>
                  }
                >
                  {primaryCta.text}
                </Button>
              </div>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href && secondaryCta.href.startsWith('/') && secondaryCta.href !== '/' && !secondaryCta.href.includes('#') && !secondaryCta.href.includes('?') && !secondaryCta.href.endsWith('/') ? secondaryCta.href + '/' : secondaryCta.href} variant="secondary" size="lg" isLightBg={isLightBg} className="w-full sm:w-auto">
                {secondaryCta.text}
              </Button>
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

// Компонент градиентной кнопки (скопирован из CenteredImageBlock)
interface GradientButtonProps {
  title: string;
  subtitle: string;
  href: string;
  iconPath?: string;
  showIcon?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({ title, subtitle, href, iconPath, showIcon = true }) => {
  return (
    <a href={href && href.startsWith('/') && href !== '/' && !href.includes('#') && !href.includes('?') && !href.endsWith('/') ? href + '/' : href} className="flex items-center gap-4 hover:opacity-80 transition-opacity duration-200 group w-full sm:w-auto">
      {/* Градиентная кнопка с иконкой */}
      {showIcon && (
        <div className="w-12 h-12 bg-gradient-to-r from-[#93d8ff] to-[#85afff] rounded-lg flex items-center justify-center flex-shrink-0">
          {iconPath && (
            <img 
              src={iconPath} 
              alt="" 
              className="w-6 h-6"
            />
          )}
        </div>
      )}
      
      {/* Текстовый блок */}
      <div className="flex flex-col justify-center min-h-[52px]">
        <div className="text-slate-900 font-body font-semibold text-xl mb-1">{title}</div>
        <div className="text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center gap-2 text-lg">
          {subtitle.replace(' →', '')}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-all duration-200 group-hover:translate-x-1">
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

export default CenteredAIBlock;
