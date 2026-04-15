import React from "react";
import Button from "./Button";

interface HeroBlockProps {
  title: string;
  description?: string | React.ReactNode;
  subtitle?: string;
  chips?: string[];
  primaryCta?: {
    text: string;
    href: string;
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    href: string;
    size?: "sm" | "md" | "lg";
  };
  note?: string;
  blockBg?: string;
  gradientButton?: boolean;
}

const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  description,
  subtitle,
  chips,
  primaryCta,
  secondaryCta,
  note,
  blockBg,
  gradientButton = false,
}) => {
  return (
    <section className="py-12 text-slate-900 text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-slate-900 mb-6 leading-tight whitespace-pre-wrap break-words" style={{ wordBreak: 'keep-all' }}>
          {title.replace(/\s+for\s+/g, ' for\u00A0')}
        </h1>
        {chips && chips.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm sm:text-base font-semibold font-subtitle"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
        {subtitle && !chips && (
          <h3 className="text-lg sm:text-xl text-blue-600 mb-12 font-subtitle font-semibold whitespace-pre-wrap break-words">
            {subtitle}
          </h3>
        )}
        {description && (
          <div className="text-xl text-slate-600 mb-8 whitespace-pre-wrap break-words">{description}</div>
        )}
        {(primaryCta?.text || secondaryCta?.text) && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            {primaryCta?.text && (
              gradientButton ? (
                <div className="relative inline-block group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 group-hover:bg-white rounded-lg p-0.5 transition-colors duration-200">
                    <div className="bg-[#0d1117] rounded-lg h-full w-full"></div>
                  </div>
                  <Button href={primaryCta.href} variant="outline-white" size={primaryCta.size || "lg"} className="relative border-0 bg-transparent" icon={primaryCta.icon}>
                    {primaryCta.text}
                  </Button>
                </div>
              ) : (
                <Button href={primaryCta.href} variant="primary" size={primaryCta.size || "lg"} icon={primaryCta.icon}>
                  {primaryCta.text}
                </Button>
              )
            )}
            {secondaryCta?.text && (
              <Button href={secondaryCta.href} variant="secondary" size={secondaryCta.size || "lg"}>
                {secondaryCta.text}
              </Button>
            )}
          </div>
        )}
        {note && (
          <p className="text-sm text-slate-500 whitespace-pre-wrap break-words">{note}</p>
        )}
      </div>
    </section>
  );
};

export default HeroBlock; 