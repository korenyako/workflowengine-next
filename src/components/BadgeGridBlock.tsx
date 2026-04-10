import React from "react";

interface BadgeItem {
  icon: string; // путь к SVG иконке или emoji
  text: string;
  color?: string; // опциональный цвет для иконки
}

interface BadgeGridBlockProps {
  title: string;
  subtitle?: string;
  badges: BadgeItem[];
  blockBg?: string;
}

const BadgeGridBlock: React.FC<BadgeGridBlockProps> = ({
  title,
  subtitle,
  badges,
  blockBg,
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-white';
  const subtitleColor = 'text-blue-300';
  const badgeBg = isLightBg ? 'bg-gray-50 border-gray-200' : 'bg-gray-800/50 border-gray-700';
  const badgeTextColor = isLightBg ? 'text-gray-900' : 'text-white';

  // Разделяем бейджи на две строки
  const firstRow = badges.slice(0, 6);
  const secondRow = badges.slice(6, 12);

  return (
    <section className="py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 ${titleColor} whitespace-pre-wrap break-words`}>
          {title}
        </h2>
        {subtitle && (
          <h3 className={`text-lg lg:text-xl font-subtitle font-semibold ${subtitleColor} whitespace-pre-wrap break-words`}>
            {subtitle}
          </h3>
        )}
      </div>
      
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Первая строка */}
        <div className="flex flex-wrap justify-start gap-4">
          {firstRow.map((badge, idx) => (
            <div 
              key={idx} 
              className={`${badgeBg} rounded-xl px-4 py-3 flex items-center gap-3 border transition-all duration-200 hover:scale-105 hover:shadow-lg flex-shrink-0`}
            >
              {/* Иконка */}
              <div className="flex-shrink-0">
                {badge.icon.startsWith("/") ? (
                  <img 
                    src={badge.icon} 
                    alt="" 
                    className="w-5 h-5"
                    style={badge.color ? { filter: `hue-rotate(${badge.color})` } : {}}
                  />
                ) : (
                  <span 
                    className="text-xl"
                    style={badge.color ? { color: badge.color } : {}}
                  >
                    {badge.icon}
                  </span>
                )}
              </div>
              
              {/* Текст */}
              <span className={`font-medium text-sm ${badgeTextColor} whitespace-nowrap`}>
                {badge.text}
              </span>
            </div>
          ))}
        </div>

        {/* Вторая строка */}
        <div className="flex flex-wrap justify-start gap-4">
          {secondRow.map((badge, idx) => (
            <div 
              key={idx + 6} 
              className={`${badgeBg} rounded-xl px-4 py-3 flex items-center gap-3 border transition-all duration-200 hover:scale-105 hover:shadow-lg flex-shrink-0`}
            >
              {/* Иконка */}
              <div className="flex-shrink-0">
                {badge.icon.startsWith("/") ? (
                  <img 
                    src={badge.icon} 
                    alt="" 
                    className="w-5 h-5"
                    style={badge.color ? { filter: `hue-rotate(${badge.color})` } : {}}
                  />
                ) : (
                  <span 
                    className="text-xl"
                    style={badge.color ? { color: badge.color } : {}}
                  >
                    {badge.icon}
                  </span>
                )}
              </div>
              
              {/* Текст */}
              <span className={`font-medium text-sm ${badgeTextColor} whitespace-nowrap`}>
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BadgeGridBlock; 