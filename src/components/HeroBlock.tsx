import React from "react";
import Button from "./Button";
import ReviewChip from "./ReviewChip";
import { Check } from "lucide-react";

interface ReviewBadge {
  logo: string;
  sourceLabel: string;
  rating: number;
  href: string;
}

interface HeroBlockProps {
  title: string;
  description?: string | React.ReactNode;
  subtitle?: string;
  highlights?: string[];
  reviewBadges?: ReviewBadge[];
  primaryCta?: {
    text: string;
    href: string;
    size?: "sm" | "md" | "lg" | "xl";
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    href: string;
    size?: "sm" | "md" | "lg" | "xl";
  };
  textLink?: {
    text: string;
    href: string;
  };
  note?: string;
  blockBg?: string;
  gradientButton?: boolean;
}

const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  description,
  subtitle,
  highlights,
  reviewBadges,
  primaryCta,
  secondaryCta,
  textLink,
  note,
  blockBg,
  gradientButton = false,
}) => {
  return (
    <section className="py-12 text-slate-900 text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {reviewBadges && reviewBadges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {reviewBadges.map((b) => (
              <ReviewChip key={b.sourceLabel} {...b} />
            ))}
          </div>
        )}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading text-slate-900 mb-6 whitespace-pre-wrap break-words" style={{ wordBreak: 'keep-all' }}>
          {title.replace(/\s+for\s+/g, ' for\u00A0')}
        </h1>
        {subtitle && (
          <h3 className="text-lg sm:text-xl text-[#4286F4] mb-12 font-subtitle font-semibold whitespace-pre-wrap break-words">
            {subtitle}
          </h3>
        )}
        {description && (
          <div className="text-xl text-slate-600 mb-8 whitespace-pre-wrap break-words">{description}</div>
        )}
        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
            {highlights.map((h) => (
              <div key={h} className="inline-flex items-center gap-2 text-sm text-slate-700">
                <Check size={16} strokeWidth={2.5} className="text-[#4286F4]" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}
        {(primaryCta?.text || secondaryCta?.text) && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
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
        {textLink?.text && (
          <a
            href={textLink.href}
            target={textLink.href.startsWith('http') ? '_blank' : '_self'}
            rel={textLink.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-block text-sm text-[#4286F4] hover:text-[#2e6ad4] underline underline-offset-4 transition-colors mb-6"
          >
            {textLink.text}
          </a>
        )}
        {note && (
          <p className="text-sm text-slate-500 whitespace-pre-wrap break-words">{note}</p>
        )}
      </div>
    </section>
  );
};

export default HeroBlock;
