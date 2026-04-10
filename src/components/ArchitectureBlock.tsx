import React from 'react';
import styles from '../styles/ArchitectureBlock.module.css';

// Иконка для Style
const StyleIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.styleIcon}
  >
    <path d="m11 10 3 3"/>
    <path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z"/>
    <path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031"/>
  </svg>
);

// Иконка для Component editors
const ComponentEditorsIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.componentEditorsIcon}
  >
    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
  </svg>
);

// Иконка для Localization settings
const LocalizationIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.localizationIcon}
  >
    <path d="m5 8 6 6"/>
    <path d="m4 14 6-6 2-3"/>
    <path d="M2 5h12"/>
    <path d="M7 2h1"/>
    <path d="m22 22-5-10-5 10"/>
    <path d="M14 18h6"/>
  </svg>
);

// Иконка для Form settings
const FormSettingsIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.formSettingsIcon}
  >
    <rect width="10" height="6" x="7" y="9" rx="2"/>
    <path d="M22 20H2"/>
    <path d="M22 4H2"/>
  </svg>
);

// Иконка для Action
const ActionIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.actionIcon}
  >
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
  </svg>
);

// Иконка для Drag & Drop form designer
const DragDropIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.dragDropIcon}
  >
    <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/>
    <path d="M5 3a2 2 0 0 0-2 2"/>
    <path d="M19 3a2 2 0 0 1 2 2"/>
    <path d="M5 21a2 2 0 0 1-2-2"/>
    <path d="M9 3h1"/>
    <path d="M9 21h2"/>
    <path d="M14 3h1"/>
    <path d="M3 9v1"/>
    <path d="M21 9v2"/>
    <path d="M3 14v1"/>
  </svg>
);

// Иконка для Validation
const ValidationIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.validationIcon}
  >
    <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/>
    <path d="m16 19 2 2 4-4"/>
  </svg>
);

// Иконка для API
const ApiIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.apiIcon}
  >
    <path d="M15 12C15 13.6569 13.6569 15 12 15M15 12C15 10.3431 13.6569 9 12 9M15 12H18M12 15C10.3431 15 9 13.6569 9 12M12 15V18M9 12C9 10.3431 10.3431 9 12 9M9 12H6M12 9V6M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6ZM18 12C18 13.1046 18.8954 14 20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12ZM6 12C6 13.1046 5.10457 14 4 14C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10C5.10457 10 6 10.8954 6 12ZM12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18Z"/>
  </svg>
);

// Иконка для Structural components
const StructuralIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.structuralIcon}
  >
    <rect width="18" height="7" x="3" y="3" rx="1"/>
    <rect width="7" height="7" x="3" y="14" rx="1"/>
    <rect width="7" height="7" x="14" y="14" rx="1"/>
  </svg>
);

// Иконка для Form renderer
const FormRendererIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.formRendererIcon}
  >
    <rect width="18" height="18" x="3" y="3" rx="2"/>
    <path d="M21 9H3"/>
    <path d="M21 15H3"/>
  </svg>
);

// Иконка для Property
const PropertyIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={styles.propertyIcon}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
    <path d="M8 12h8"/>
    <path d="M10 11v2"/>
    <path d="M8 17h8"/>
    <path d="M14 16v2"/>
  </svg>
);

interface ComponentItem {
  icon: React.ReactNode | string;
  title: string;
  isActive?: boolean;
  href?: string;
  children?: ComponentItem[];
}

interface ArchitectureBlockProps {
  title: string;
  description: string;
  packageName: string;
  components: ComponentItem[];
}

const ArchitectureBlock: React.FC<ArchitectureBlockProps> = ({ 
  title, 
  description, 
  packageName,
  components
}) => {
  console.log('ArchitectureBlock rendered with:', { title, description, packageName, components });
  // Функция для получения иконки по имени
  const getIcon = (iconName: string): React.ReactNode => {
    switch (iconName) {
      case 'DragDropIcon': return <DragDropIcon />;
      case 'FormSettingsIcon': return <FormSettingsIcon />;
      case 'ComponentEditorsIcon': return <ComponentEditorsIcon />;
      case 'LocalizationIcon': return <LocalizationIcon />;
      case 'PropertyIcon': return <PropertyIcon />;
      case 'StyleIcon': return <StyleIcon />;
      case 'ValidationIcon': return <ValidationIcon />;
      case 'ActionIcon': return <ActionIcon />;
      case 'FormRendererIcon': return <FormRendererIcon />;
      case 'ApiIcon': return <ApiIcon />;
      case 'StructuralIcon': return <StructuralIcon />;
      default: return null;
    }
  };

  // Преобразуем компоненты, заменяя строковые иконки на компоненты
  const processedComponents = components.map(component => ({
    ...component,
    icon: getIcon(component.icon as string),
    children: component.children?.map(child => ({
      ...child,
      icon: getIcon(child.icon as string)
    }))
  }));
  // Проверяем, есть ли дочерние элементы (третий уровень)
  const hasChildren = processedComponents.some(component => component.children && component.children.length > 0);
  
  return (
    <section className={`pt-16 px-4 sm:px-8 ${hasChildren ? 'pb-8' : 'pb-16'}`}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center ${hasChildren ? 'mb-12' : 'mb-8'}`}>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg lg:text-xl text-gray-300">
            {description}
          </p>
        </div>

        <div className={styles.orgChartWrapper}>
          <div className={styles.orgChartContainer}>
            <ol className={`${styles.orgChartOrganizationalChart} ${processedComponents.length === 3 ? styles.threeItems : processedComponents.length === 2 ? styles.twoItems : processedComponents.length === 4 ? styles.fourItems : processedComponents.length === 5 ? styles.fiveItems : ''}`}>
              <li>
                <div>
                  <h2>{packageName}</h2>
                </div>
                <ol>
                  {processedComponents.map((component, index) => (
                    <li key={index}>
                      <div className={component.isActive ? styles.orgChartActive : ''}>
                        {component.href ? (
                          <a href={component.href} {...(component.href.startsWith('https://workflowengine.io/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })} className={styles.orgChartResourceLink}>
                            {component.icon}
                            <h2>{component.title}</h2>
                          </a>
                        ) : (
                          <div className={styles.orgChartResourceLink}>
                            {component.icon}
                            <h2>{component.title}</h2>
                          </div>
                        )}
                      </div>
                      {component.children && component.children.length > 0 && (
                        <ol>
                          {component.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <div>
                                {child.href ? (
                                  <a href={child.href} {...(child.href.startsWith('https://workflowengine.io/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })} className={styles.orgChartResourceLink}>
                                    {child.icon}
                                    <h3>{child.title}</h3>
                                  </a>
                                ) : (
                                  <div className={styles.orgChartResourceLink}>
                                    {child.icon}
                                    <h3>{child.title}</h3>
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureBlock; 