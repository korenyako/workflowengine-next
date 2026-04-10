import React from "react";

interface Framework {
  name: string;
  logo: string;
  description: string;
  href: string;
}

interface FrameworkLogosBlockProps {
  title?: string;
  subtitle?: string;
  description?: string;
  frameworks?: Framework[];
  blockBg?: string;
  anchor?: string;
}

const FrameworkLogosBlock: React.FC<FrameworkLogosBlockProps> = ({
  title = "Choose Your UI Component Library",
  subtitle,
  description,
  frameworks = [
    {
      name: "MUI",
      logo: "/icons/mui.svg",
      description: "Connect to Material UI for a fully customizable React form experience.",
      href: "/react-form-components-library/mui/"
    },
    {
      name: "Shadcn UI",
      logo: "/icons/shadcn.svg",
      description: "Design forms with shadcn/ui components for consistent and modern form layouts.",
      href: "/react-form-components-library/shadcn-ui/"
    },
    {
      name: "Mantine",
      logo: "/icons/mantine.svg",
      description: "Use Mantine's polished UI elements and extend your form styling with themes.",
      href: "/react-form-components-library/mantine/"
    },
    {
      name: "React Suite",
      logo: "/icons/rsuite.svg",
      description: "Simplify complex forms with React Suite's ready-to-use and modular components.",
      href: "/react-form-components-library/rsuite/"
    },
    {
      name: "Ant Design",
      logo: "/icons/antdesign.svg",
      description: "Build enterprise-ready forms with Ant Design's clean components and validation system.",
      href: "/react-form-components-library/ant-design/"
    },
    {
      name: "Bootstrap",
      logo: "/icons/bootstrap.svg",
      description: "Quickly prototype or migrate legacy forms using Bootstrap-compatible layouts.",
      href: "/react-form-components-library/bootstrap/"
    },
    {
      name: "Tailwind",
      logo: "/icons/tailwind.svg",
      description: "Style and validate forms in real time using Tailwind's utility-first classes.",
      href: "/react-form-components-library/tailwind/"
    },
    {
      name: "Chakra UI",
      logo: "/icons/chakra.svg",
      description: "Design accessible and themeable forms with Chakra's flexible layout system.",
      href: "/react-form-components-library/chakra-ui/"
    },
    {
      name: "Hero UI",
      logo: "/icons/heroui.svg",
      description: "Build stunning, accessible forms with Hero UI's beautiful, customizable components.",
      href: "/react-form-components-library/hero-ui/"
    },
    {
      name: "Tamagui",
      logo: "/icons/tamagui.svg",
      description: "Create cross-platform forms for React Native and Web with optimizing compiler.",
      href: "/react-form-components-library/tamagui/"
    },
    {
      name: "Headless UI",
      logo: "/icons/headlessui.svg",
      description: "Design fully custom forms with unstyled, accessible primitives from Tailwind Labs.",
      href: "/react-form-components-library/headless-ui/"
    },
    {
      name: "React Spectrum",
      logo: "/icons/react-spectrum.svg",
      description: "Build enterprise forms with Adobe's adaptive, accessibility-first design system.",
      href: "/react-form-components-library/react-spectrum/"
    },
    {
      name: "Radix",
      logo: "/icons/radix.svg",
      description: "Integrate Radix primitives to handle accessibility and structure out of the box.",
      href: "/react-form-components-library/radix/"
    },
    {
      name: "Fluent UI",
      logo: "/icons/fluent.svg",
      description: "Bring Microsoft-style consistency to your forms with Fluent UI components.",
      href: "/react-form-components-library/fluent-ui/"
    },
    {
      name: "Semantic UI",
      logo: "/icons/semantic.svg",
      description: "Create responsive, human-readable forms with Semantic UI's natural class naming.",
      href: "/react-form-components-library/semantic-ui/"
    },
    {
      name: "daisyUI",
      logo: "/icons/daisyui.svg",
      description: "Style forms with daisyUI's pure CSS components and 30+ built-in themes.",
      href: "/react-form-components-library/daisyui/"
    }
  ],
  blockBg,
  anchor,
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-white';
  const subtitleColor = 'text-blue-300'; // Всегда синий для subtitle
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-gray-300';

  return (
    <section className="py-16 px-4 sm:px-8" id={anchor} style={{ backgroundColor: blockBg }}>
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          {title && (
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold mb-4 leading-tight ${titleColor}`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <h3 className={`text-lg font-subtitle font-semibold tracking-wide mb-4 ${subtitleColor}`}>
              {subtitle}
            </h3>
          )}
          {description && (
            <p className={`text-lg lg:text-xl ${descriptionColor} max-w-3xl mx-auto`}>
              {description}
            </p>
          )}
        </div>

        {/* Карточки с логотипами */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {frameworks.map((framework, index) => (
            <a
              key={index}
              href={framework.href}
              className="group flex flex-col items-start p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200"
            >
              {/* Логотип */}
              <div className="w-20 h-20 mb-6 flex items-center justify-center">
                <img
                  src={framework.logo}
                  alt={`${framework.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Название */}
              <h3 className="text-base font-subtitle font-semibold tracking-wide text-blue-300 mb-2">
                {framework.name}
              </h3>
              
              {/* Описание */}
              <p className="text-lg text-gray-300 leading-normal">
                {framework.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrameworkLogosBlock;
