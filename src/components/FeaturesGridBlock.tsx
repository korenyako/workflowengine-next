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
import ValidationIcon from './icons/ValidationIcon';
import ScriptIcon from './icons/ScriptIcon';
import ProgrammaticIcon from './icons/ProgrammaticIcon';
import ReusableFormsIcon from './icons/ReusableFormsIcon';
import ScaleAcrossProjectsIcon from './icons/ScaleAcrossProjectsIcon';
import SingleJsonFormIcon from './icons/SingleJsonFormIcon';
import MuiComponentsPackIcon from './icons/MuiComponentsPackIcon';
import LightweightBundleIcon from './icons/LightweightBundleIcon';
import ModernStackIcon from './icons/ModernStackIcon';
import UiAgnosticIcon from './icons/UiAgnosticIcon';
import SurveysIcon from './icons/SurveysIcon';
import OnboardingFlowIcon from './icons/OnboardingFlowIcon';
import AdminPanelIcon from './icons/AdminPanelIcon';
import B2BConfigIcon from './icons/B2BConfigIcon';

interface IconProps {
  size?: number;
  className?: string;
}

interface Feature {
  icon: string | React.ComponentType<IconProps>; // emoji, путь к SVG или React компонент
  title: string;
  text: string;
}

interface FeaturesGridBlockProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  blockBg?: string;
  anchor?: string;
  centered?: boolean;
  iconSize?: number;
}

const FeaturesGridBlock: React.FC<FeaturesGridBlockProps> = ({
  title,
  subtitle,
  description,
  features,
  blockBg,
  anchor,
  centered = false,
  iconSize = 24,
}) => {
  // CSS для градиентного текста
  const gradientTextStyle = {
    background: 'linear-gradient(to right, #93d8ff, #85afff)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
  };


  // Раньше маппились пути на RemixIcon. Теперь используем напрямую SVG из /public/icons или React-компоненты.

  // Функция для получения React компонента иконки по имени
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<IconProps> } = {
      'OnboardingIcon': OnboardingIcon,
      'CustomComponentIcon': CustomComponentIcon,
      'DragDropEditorIcon': DragDropEditorIcon,
      'JsonImportExportIcon': JsonImportExportIcon,
      'DesignedForTeamsIcon': DesignedForTeamsIcon,
      'LiveFormPreviewIcon': LiveFormPreviewIcon,
      'DynamicLogicIcon': DynamicLogicIcon,
      'WhiteLabelIcon': WhiteLabelIcon,
      'ValidationIcon': ValidationIcon,
      'ScriptIcon': ScriptIcon,
      'CollaborationIcon': CollaborationIcon,
      'DeveloperIntegrationIcon': DeveloperIntegrationIcon,
      'MultiLanguageIcon': MultiLanguageIcon,
      'LayoutControlsIcon': LayoutControlsIcon,
      'ProgrammaticIcon': ProgrammaticIcon,
      'ReusableFormsIcon': ReusableFormsIcon,
      'ScaleAcrossProjectsIcon': ScaleAcrossProjectsIcon,
      'SingleJsonFormIcon': SingleJsonFormIcon,
      'MuiComponentsPackIcon': MuiComponentsPackIcon,
      'LightweightBundleIcon': LightweightBundleIcon,
      'ModernStackIcon': ModernStackIcon,
      'UiAgnosticIcon': UiAgnosticIcon,
      'SurveysIcon': SurveysIcon,
      'OnboardingFlowIcon': OnboardingFlowIcon,
      'AdminPanelIcon': AdminPanelIcon,
      'B2BConfigIcon': B2BConfigIcon,
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
      case 64: return 'w-16 h-16';
      default: return 'w-6 h-6';
    }
  };

  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-slate-600';
  const cardBg = 'bg-transparent'; // Убираем фон из карточек
  const cardTitleColor = 'text-blue-600'; // Тот же цвет что и subtitle в Custom Components
  const cardTextColor = isLightBg ? 'text-gray-600' : 'text-slate-600';

  return (
    <section className="py-16 px-4 sm:px-8" id={anchor}>
      <div className="max-w-6xl mx-auto text-center mb-12">
        {/* Бейдж Core */}
        {title && title.includes('WorkflowEngine React Form Library') && (
          <div className="mb-6 px-4 py-2 rounded-full text-base font-semibold text-slate-900 border border-gray-300 inline-block">
            Core
          </div>
        )}
        
        {title && (
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-6 uppercase tracking-wide whitespace-pre-wrap break-words" style={{ wordBreak: 'keep-all' }}>
            {title.replace(/\s+for\s+/g, ' for\u00A0')}
          </h2>
        )}
        {subtitle && (
          <h3 className="text-blue-600 text-lg font-subtitle font-semibold tracking-wide mb-4 whitespace-pre-wrap break-words">
            {subtitle}
          </h3>
        )}
        {description && <p className={`text-lg lg:text-xl ${descriptionColor} whitespace-pre-wrap break-words`}>{description}</p>}
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className={`${cardBg} flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'} h-full`}>
            {typeof feature.icon === 'string' ? (
              feature.icon.startsWith("/") ? (
                <img src={feature.icon} alt="" className={`${getIconContainerClass(iconSize)} mb-4`} />
              ) : getIconComponent(feature.icon) ? (
                <div className={`${getIconContainerClass(iconSize)} mb-4`}>
                  {React.createElement(getIconComponent(feature.icon)!, { size: iconSize })}
                </div>
              ) : (
                <span className="text-4xl mb-4">{feature.icon}</span>
              )
            ) : (
              <div className={`${getIconContainerClass(iconSize)} mb-4`}>
                {React.createElement(feature.icon, { size: iconSize })}
              </div>
            )}
            <h3 className={`text-base font-subtitle font-semibold tracking-wide ${cardTitleColor} mb-2 whitespace-pre-wrap break-words`}>{feature.title}</h3>
            <p className={`text-lg lg:text-xl ${isLightBg ? 'text-gray-600' : 'text-slate-600'} whitespace-pre-wrap break-words leading-normal`}>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGridBlock; 
