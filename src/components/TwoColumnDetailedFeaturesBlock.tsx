import React from "react";
import {
  MousePointerClick,
  Layers,
  FilePen,
  GitFork,
  Clock,
  CodeXml,
  Languages,
  Database,
  GitBranch,
  Server,
  Shield,
  Webhook,
  type LucideIcon,
} from "lucide-react";

const FEATURE_ICONS: Record<string, LucideIcon> = {
  "mouse-pointer-click": MousePointerClick,
  layers: Layers,
  "file-pen": FilePen,
  "git-fork": GitFork,
  clock: Clock,
  "code-xml": CodeXml,
  languages: Languages,
  database: Database,
  "git-branch": GitBranch,
  server: Server,
  shield: Shield,
  webhook: Webhook,
};

interface FeatureItem {
  icon: string;
  title: string;
  text: string;
}

interface Column {
  items: FeatureItem[];
}

interface TwoColumnDetailedFeaturesBlockProps {
  title: string;
  subtitle?: string;
  columns: Column[]; // массив из двух колонок
  blockBg?: string;
}

const TwoColumnDetailedFeaturesBlock: React.FC<TwoColumnDetailedFeaturesBlockProps> = ({
  title,
  subtitle,
  columns,
  blockBg,
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const subtitleColor = 'text-[#4286F4]';
  const cardBg = isLightBg ? 'bg-gray-50' : 'bg-slate-100';
  const cardTitleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const cardTextColor = isLightBg ? 'text-gray-600' : 'text-slate-600';

  return (
    <section className="py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h2 className={`font-heading mb-2 ${titleColor} whitespace-pre-wrap break-words`}>{title}</h2>
        {subtitle && <h3 className={`text-lg font-subtitle mb-2 ${subtitleColor} whitespace-pre-wrap break-words`}>{subtitle}</h3>}
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-8">
            {col.items.map((item, idx) => {
              const IconComponent = FEATURE_ICONS[item.icon];
              return (
                <div key={idx} className={`flex flex-col items-center text-center ${cardBg} rounded-3xl p-8 h-full`}>
                  {IconComponent && <IconComponent size={48} strokeWidth={2} className={`mb-4 ${cardTitleColor}`} />}
                  <h3 className={`font-heading mb-2 ${cardTitleColor} whitespace-pre-wrap break-words`}>{item.title}</h3>
                  <p className={`${cardTextColor} whitespace-pre-wrap break-words`}>{item.text}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TwoColumnDetailedFeaturesBlock; 