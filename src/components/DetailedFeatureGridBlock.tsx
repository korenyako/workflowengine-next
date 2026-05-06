'use client';

import React, { useState } from "react";
import {
  FilePen,
  Database,
  Layers,
  Rocket,
  Clock,
  Server,
  Monitor,
  type LucideIcon,
} from "lucide-react";

const FEATURE_ICONS: Record<string, LucideIcon> = {
  "file-pen": FilePen,
  database: Database,
  layers: Layers,
  rocket: Rocket,
  clock: Clock,
  server: Server,
  monitor: Monitor,
};

// Ротация цветов для табов. Tailwind v4 JIT: классы строковыми литералами.
const TAB_COLORS = [
  "text-[#4286F4]",  // blue
  "text-[#F97316]",  // orange
  "text-[#A855F7]",  // purple
  "text-[#10B981]",  // emerald
  "text-[#EC4899]",  // pink
  "text-[#F59E0B]",  // amber
];
const TAB_BG_TINTS = [
  "bg-[#4286F4]/10",
  "bg-[#F97316]/10",
  "bg-[#A855F7]/10",
  "bg-[#10B981]/10",
  "bg-[#EC4899]/10",
  "bg-[#F59E0B]/10",
];

interface Feature {
  icon: string;
  title: string;
  tabLabel?: string;
  text: string;
  benefit?: string;
  details?: string;
}

interface Testimonial {
  photo?: string;
  logo?: string;
  text: string;
  name: string;
  title: string;
  company: string;
}

interface DetailedFeatureGridBlockProps {
  title: string;
  subtitle?: string;
  text?: string;
  layout?: "grid" | "tabs";
  features: Feature[];
  testimonial?: Testimonial;
  blockBg?: string;
}

const DetailedFeatureGridBlock: React.FC<DetailedFeatureGridBlockProps> = ({
  title,
  subtitle,
  text,
  layout = "grid",
  features,
  testimonial,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const testimonialParagraphs = testimonial ? testimonial.text.split("\n\n") : [];

  const active = features[activeTab] || features[0];
  const ActiveIcon = active ? FEATURE_ICONS[active.icon] : undefined;

  return (
    <section className="py-12 lg:py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center mb-12">
        {subtitle && <h3 className="text-sm uppercase tracking-[0.2em] font-mono font-medium text-[#4286F4] mb-4 whitespace-pre-wrap break-words">{subtitle}</h3>}
        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading text-slate-900 mb-6 whitespace-pre-wrap break-words">{title}</h2>
        {text && <p className="text-xl text-slate-600 whitespace-pre-wrap break-words">{text}</p>}
      </div>

      {layout === "tabs" ? (
        <div className="-mx-4 sm:-mx-8 border-2 border-slate-200 rounded-3xl py-12 lg:py-16 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <div className="flex flex-row flex-wrap gap-6">
              {features.map((feature, idx) => {
                const TabIcon = FEATURE_ICONS[feature.icon];
                const iconColor = TAB_COLORS[idx % TAB_COLORS.length];
                const bgTint = TAB_BG_TINTS[idx % TAB_BG_TINTS.length];
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-full text-left transition-colors duration-200 cursor-pointer ${
                      idx === activeTab
                        ? `${bgTint} ${iconColor}`
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {TabIcon && <TabIcon size={24} strokeWidth={2} className={`flex-shrink-0 ${iconColor}`} />}
                    <span className="text-base lg:text-lg font-semibold">{feature.tabLabel || feature.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex-1">
              <p className="text-xl lg:text-2xl text-slate-600 leading-snug whitespace-pre-wrap break-words">{active.text}</p>

              {(active.benefit || active.details) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                  {active.benefit && (
                    <div className={`${TAB_BG_TINTS[activeTab % TAB_BG_TINTS.length]} rounded-2xl p-6`}>
                      <h4 className={`text-2xl lg:text-3xl font-heading mb-3 ${TAB_COLORS[activeTab % TAB_COLORS.length]}`}>What's In It For Me?</h4>
                      <p className="text-base text-slate-700 leading-relaxed">{active.benefit}</p>
                    </div>
                  )}
                  {active.details && (
                    <div className="bg-slate-100 rounded-2xl p-6">
                      <h4 className="text-2xl lg:text-3xl font-heading text-slate-900 mb-3">What Does It Do?</h4>
                      <p className="text-base text-slate-700 leading-relaxed">{active.details}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const IconComponent = FEATURE_ICONS[feature.icon];
            return (
              <div key={idx} className="bg-white rounded-3xl p-8 flex flex-col items-start text-left h-full">
                {IconComponent && <IconComponent size={48} strokeWidth={2} className="mb-4 text-slate-900" />}
                <h3 className="text-2xl lg:text-3xl font-heading text-slate-900 mb-3 whitespace-pre-wrap break-words">{feature.title}</h3>
                <p className="text-lg text-slate-600 whitespace-pre-wrap break-words">{feature.text}</p>
              </div>
            );
          })}
        </div>
      )}

      {testimonial && (
        <div className="max-w-6xl mx-auto mt-8 lg:mt-10 px-4 sm:px-6">
          <div className="space-y-4 mb-8">
            {testimonialParagraphs.map((p, i) => (
              <p key={i} className="text-2xl lg:text-3xl font-semibold text-slate-900 leading-snug">
                {p}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {testimonial.logo ? (
              <img
                src={testimonial.logo}
                alt={testimonial.company}
                className="h-10 w-auto flex-shrink-0"
              />
            ) : testimonial.photo ? (
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
            ) : null}
            <div>
              <p className="text-base font-semibold text-slate-900">{testimonial.name}</p>
              <p className="text-sm text-slate-500">{testimonial.title}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailedFeatureGridBlock;
