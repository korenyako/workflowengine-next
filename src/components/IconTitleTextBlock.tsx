import React from "react";

interface IconTitleTextItem {
  icon: string;
  title: string;
  text: string;
}

interface IconTitleTextBlockProps {
  items: IconTitleTextItem[];
  blockBg?: string;
}

const IconTitleTextBlock: React.FC<IconTitleTextBlockProps> = ({ 
  items, 
  blockBg 
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const textColor = isLightBg ? 'text-gray-600' : 'text-slate-600';

  // Функция для рендеринга иконки
  const renderIcon = (icon: string) => {
    if (icon === 'check') {
      return (
        <svg 
          className="w-6 h-6 text-green-400" 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M5 12l5 5l10 -10" />
        </svg>
      );
    }
    
    if (icon.startsWith("/")) {
      return <img src={icon} alt="" className="w-6 h-6" />;
    }
    
    return <span className="text-2xl">{icon}</span>;
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            {renderIcon(item.icon)}
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold mb-2 ${titleColor} whitespace-pre-wrap break-words`}>
              {item.title}
            </h3>
            <p className={`text-base ${textColor} whitespace-pre-wrap break-words`}>
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IconTitleTextBlock; 