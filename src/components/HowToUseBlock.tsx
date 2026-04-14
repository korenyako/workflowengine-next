import React from "react";
import OnboardingIcon from './icons/OnboardingIcon';
import CustomComponentIcon from './icons/CustomComponentIcon';
import DragDropEditorIcon from './icons/DragDropEditorIcon';
import JsonImportExportIcon from './icons/JsonImportExportIcon';
import DesignedForTeamsIcon from './icons/DesignedForTeamsIcon';
import LiveFormPreviewIcon from './icons/LiveFormPreviewIcon';
import DynamicLogicIcon from './icons/DynamicLogicIcon';
import WhiteLabelIcon from './icons/WhiteLabelIcon';
import CollaborationIcon from './icons/CollaborationIcon';
import DeveloperIntegrationIcon from './icons/DeveloperIntegrationIcon';
import MultiLanguageIcon from './icons/MultiLanguageIcon';
import LayoutControlsIcon from './icons/LayoutControlsIcon';
import LibraryIcon from './icons/LibraryIcon';
import ComponentsIcon from './icons/ComponentsIcon';

interface HowToUseItem {
  icon: string | React.ComponentType<{ size?: number }>; // emoji, путь к SVG или React компонент
  title: string;
  text: string;
}

interface HowToUseBlockProps {
  title?: string;
  subtitle?: string;
  description?: string;
  items: HowToUseItem[];
  blockBg?: string;
  columns?: number;
  centered?: boolean;
}

const HowToUseBlock: React.FC<HowToUseBlockProps> = ({
  title,
  subtitle,
  description,
  items,
  blockBg,
  columns,
  centered = false,
}) => {
  // Функция для получения React компонента иконки по имени
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ size?: number }> } = {
      'OnboardingIcon': OnboardingIcon,
      'CustomComponentIcon': CustomComponentIcon,
      'DragDropEditorIcon': DragDropEditorIcon,
      'JsonImportExportIcon': JsonImportExportIcon,
      'DesignedForTeamsIcon': DesignedForTeamsIcon,
      'LiveFormPreviewIcon': LiveFormPreviewIcon,
      'DynamicLogicIcon': DynamicLogicIcon,
      'WhiteLabelIcon': WhiteLabelIcon,
      'CollaborationIcon': CollaborationIcon,
      'DeveloperIntegrationIcon': DeveloperIntegrationIcon,
      'MultiLanguageIcon': MultiLanguageIcon,
      'LayoutControlsIcon': LayoutControlsIcon,
      'LibraryIcon': LibraryIcon,
      'ComponentsIcon': ComponentsIcon,
    };
    return iconMap[iconName];
  };

  // Функция для получения класса контейнера в зависимости от размера иконки
  const getIconContainerClass = (size: number) => {
    switch (size) {
      case 16: return 'w-4 h-4';
      case 24: return 'w-6 h-6';
      case 32: return 'w-8 h-8';
      case 48: return 'w-12 h-12';
      default: return 'w-6 h-6';
    }
  };

  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-slate-600';
  const cardBg = 'bg-transparent';
  const cardTitleColor = 'text-blue-600';

  return (
    <section className={`${centered ? 'py-16 lg:py-24' : 'py-8'} px-4 sm:px-8`}>
      <div className="max-w-6xl mx-auto text-center mb-12">
        {title && (
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-slate-900 mb-6">
            {title}
          </h2>
        )}
        {subtitle && (
          <h3 className="text-blue-600 text-lg font-subtitle font-semibold tracking-wide mb-4 whitespace-pre-wrap break-words">
            {subtitle}
          </h3>
        )}
        {description && <p className={`text-lg lg:text-xl ${descriptionColor} mb-12 ${centered ? 'max-w-3xl mx-auto' : ''}`}>{description}</p>}
      </div>

      <div className={`max-w-6xl mx-auto grid grid-cols-1 ${
        columns === 4 ? 'md:grid-cols-4 gap-6' :
        columns === 3 ? 'md:grid-cols-3 gap-8' :
        'md:grid-cols-2 gap-8'
      }`}>
        {items.map((item, idx) => (
          <div key={idx} className={`${cardBg} flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'} h-full`}>
            {typeof item.icon === 'string' ? (
              item.icon.startsWith("/") ? (
                <img src={item.icon} alt="" className={`w-12 h-12 mb-4 ${centered ? 'mx-auto' : ''}`} />
              ) : getIconComponent(item.icon) ? (
                <div className={`${getIconContainerClass(24)} mb-4 ${centered ? 'mx-auto' : ''}`}>
                  {React.createElement(getIconComponent(item.icon)!, { size: 24 })}
                </div>
              ) : (
                centered ? (
                <div className={`mb-4 mx-auto w-10 h-10 rounded-full flex items-center justify-center bg-white/10`}>
                  <span className="text-slate-900 font-bold text-lg">{item.icon}</span>
                </div>
              ) : (
                <span className="text-4xl mb-4">{item.icon}</span>
              )
              )
            ) : (
              <div className={`${getIconContainerClass(24)} mb-4 ${centered ? 'mx-auto' : ''}`}>
                {React.createElement(item.icon, { size: 24 })}
              </div>
            )}
            <h3 className={`${centered ? 'text-2xl' : 'text-base'} font-subtitle font-semibold tracking-wide ${cardTitleColor} ${centered ? 'mb-3' : 'mb-2'} whitespace-pre-wrap break-words`}>{item.title}</h3>
            {item.text && <p className={`${centered ? '' : 'text-lg lg:text-xl'} ${isLightBg ? 'text-gray-600' : 'text-slate-600'} whitespace-pre-wrap break-words leading-normal`}>{item.text}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToUseBlock;
