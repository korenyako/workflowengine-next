import React from "react";
import Button from "./Button";
// Набор простых inline-SVG для бейджей (замена Remix Icon)
const BadgeIcon = ({ name, className = 'w-4 h-4', color }: { name: string; className?: string; color?: string }) => {
  const props = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  switch (name) {
    case 'unlock':
      return <svg {...props}><path d="M7 11V7a5 5 0 0 1 9.9-1"/><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11h10"/></svg>;
    case 'file-text':
      return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>;
    case 'tools':
      return <svg {...props}><path d="M7 7l10 10"/><path d="M12 8a3 3 0 1 1 4 4"/><path d="M3 21l6-6"/></svg>;
    case 'react':
      return <svg {...props}><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(120 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4"/></svg>;
    case 'layout':
      return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>;
    case 'refresh':
      return <svg {...props}><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>;
    case 'bolt':
      return <svg {...props}><path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/></svg>;
    case 'check':
      return <svg {...props}><path d="M20 6 9 17l-5-5"/></svg>;
    case 'globe':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case 'phone':
      return <svg {...props}><path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.18 2 2 0 0 1 4 2h4.09a2 2 0 0 1 2 1.72c.12.9.31 1.77.57 2.61a2 2 0 0 1-.45 2.11L9 9a16 16 0 0 0 6 6l.56-1.21a2 2 0 0 1 2.11-.45c.84.26 1.71.45 2.61.57A2 2 0 0 1 22 16.92z"/></svg>;
    case 'settings':
      return <svg {...props}><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.6 15a1.65 1.65 0 0 0-1.51-1H2a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 3.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 3.6a1.65 1.65 0 0 0 1-1.51V2a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15 3.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 20.4 8c0 .62.24 1.21.68 1.65.44.44 1.03.68 1.65.68H23a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case 'book':
      return <svg {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4v15.5A2.5 2.5 0 0 0 6.5 22H20V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/></svg>;
    default:
      return null;
  }
};

interface BadgeItem {
  icon: string;
  text: string;
  color?: string;
}

interface RatingCTABlockProps {
  title: string;
  rating: number; // 1-5
  source: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  blockBg?: string;
  badges?: BadgeItem[]; // добавляем бейджи
}

const RatingCTABlock: React.FC<RatingCTABlockProps> = ({
  title,
  rating,
  source,
  primaryCta,
  secondaryCta,
  blockBg,
  badges = [], // бейджи по умолчанию пустой массив
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-slate-600';
  const sourceColor = isLightBg ? 'text-slate-500' : 'text-slate-500';
  const badgeBg = isLightBg ? 'border-gray-200' : 'border-slate-300';
  const badgeTextColor = isLightBg ? 'text-gray-900' : 'text-slate-900';

  // Маппинг эмодзи на inline-SVG
  const getBadgeIconName = (emoji: string) => {
    const map: { [k: string]: string } = {
      '🔓': 'unlock',
      '📄': 'file-text',
      '🛠️': 'tools',
      '⚛️': 'react',
      '📦': 'layout',
      '🔄': 'refresh',
      '⚡': 'bolt',
      '✅': 'check',
      '🌐': 'globe',
      '📱': 'phone',
      '🔧': 'settings',
      '📚': 'book',
    };
    return map[emoji];
  };



  // Разделяем бейджи на две строки (7 в первой, 5 во второй)
  const firstRow = badges.slice(0, 7);
  const secondRow = badges.slice(7, 12);

  return (
    <section className="py-8 lg:py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Левая часть - контент */}
          <div className="space-y-6">
            {/* Заголовок-цитата */}
            <div>
              {/* Декоративная кавычка над текстом */}
              <div className="mb-4">
                <img 
                  src="/icons/quote.svg" 
                  alt="" 
                />
              </div>
              
              {/* Заголовок как цитата */}
              <h2 className={`text-2xl lg:text-3xl xl:text-4xl font-bold ${titleColor} leading-relaxed`}>
                {title}
              </h2>
            </div>

            {/* Рейтинг и источник */}
            <div className="space-y-4">
              {/* Звезды */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-slate-500'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Reviews on Trustpilot */}
              <div className="flex items-center gap-2">
                <span className={`text-sm ${sourceColor} leading-tight`}>Reviews on</span>
                {source === "Trustpilot" ? (
                  <a 
                    href="https://www.trustpilot.com/review/optimajet.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img src="/logos/trustpilot.svg" alt="Trustpilot" className="h-4" />
                  </a>
                ) : (
                  <span className={`text-sm ${sourceColor} leading-tight`}>{source}</span>
                )}
              </div>
            </div>
            
            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button href={primaryCta.href} variant="primary" size="lg" isLightBg={isLightBg} className="w-full sm:w-auto">
                {primaryCta.text}
              </Button>
              <Button href={secondaryCta.href} variant="secondary" size="lg" isLightBg={isLightBg} className="w-full sm:w-auto">
                {secondaryCta.text}
              </Button>
            </div>
          </div>
          
          {/* Правая часть - бейджи */}
          <div className="space-y-4">
            {/* Первая строка бейджей */}
            <div className="flex flex-wrap justify-start gap-3">
              {firstRow.map((badge, idx) => (
                <div 
                  key={idx} 
                  className={`${badgeBg} rounded-full px-3 py-2 flex items-center gap-2 border-2 transition-all duration-200 hover:shadow-lg flex-shrink-0`}
                >
                  {/* Иконка */}
                  <div className="flex-shrink-0">
                    {badge.icon.startsWith("/") ? (
                      <img 
                        src={badge.icon} 
                        alt="" 
                        className="w-4 h-4"
                        style={badge.color ? { filter: `hue-rotate(${badge.color})` } : {}}
                      />
                    ) : (
                      <span style={badge.color ? { color: badge.color } : {}}>
                        <BadgeIcon name={getBadgeIconName(badge.icon) || ''} className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  
                  {/* Текст */}
                  <span className={`font-medium text-base ${badgeTextColor} whitespace-nowrap`}>
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Вторая строка бейджей */}
            <div className="flex flex-wrap justify-start gap-3">
              {secondRow.map((badge, idx) => (
                <div 
                  key={idx + 6} 
                  className={`${badgeBg} rounded-full px-3 py-2 flex items-center gap-2 border-2 transition-all duration-200 hover:shadow-lg flex-shrink-0`}
                >
                  {/* Иконка */}
                  <div className="flex-shrink-0">
                    {badge.icon.startsWith("/") ? (
                      <img 
                        src={badge.icon} 
                        alt="" 
                        className="w-4 h-4"
                        style={badge.color ? { filter: `hue-rotate(${badge.color})` } : {}}
                      />
                    ) : (
                      <i
                        className={`${badge.icon} text-lg`}
                        style={badge.color ? { color: badge.color } : {}}
                      />
                    )}
                  </div>
                  
                  {/* Текст */}
                  <span className={`font-medium text-base ${badgeTextColor} whitespace-nowrap`}>
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatingCTABlock; 
