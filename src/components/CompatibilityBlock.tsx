import React from "react";

interface TechLogo {
  name: string;
  logo: string;
  small?: boolean;
  maxH?: number;
}

interface LogoGroup {
  label?: string;
  logos: TechLogo[];
}

interface CompatibilityBlockProps {
  subtitle?: string;
  eyebrowLogo?: string;
  eyebrowLogoAlt?: string;
  title?: string;
  description?: string;
  groups: LogoGroup[];
  anchor?: string;
  blockBg?: string;
  theme?: 'light' | 'dark';
}

const LogoRow: React.FC<{ logos: TechLogo[] }> = ({ logos }) => (
  <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-14">
    {logos.map((t, i) => (
      <div key={i} className="flex items-center justify-center" title={t.name}>
        <img
          src={t.logo}
          alt={t.name}
          className={t.maxH ? 'w-auto' : `${t.small ? 'max-h-7 lg:max-h-9' : 'max-h-10 lg:max-h-12'} w-auto`}
          style={t.maxH ? { maxHeight: `${t.maxH}px` } : undefined}
        />
      </div>
    ))}
  </div>
);

const CompatibilityBlock: React.FC<CompatibilityBlockProps> = ({
  subtitle,
  eyebrowLogo,
  eyebrowLogoAlt = "",
  title,
  description,
  groups,
  anchor,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const titleColor = isDark ? 'text-white' : 'text-slate-900';
  const descColor = isDark ? 'text-slate-300' : 'text-slate-600';
  return (
    <section className="py-12 lg:py-16 px-4 sm:px-8" id={anchor}>
      <div className="max-w-6xl mx-auto">
        {(eyebrowLogo || subtitle || title) && (
          <div className="flex flex-col items-center text-center mb-12">
            {eyebrowLogo ? (
              <img
                src={eyebrowLogo}
                alt={eyebrowLogoAlt}
                className="h-16 lg:h-20 w-auto mb-6"
              />
            ) : subtitle ? (
              <h3 className="text-sm uppercase font-mono font-medium tracking-[0.2em] text-[#4286F4] mb-4 whitespace-pre-wrap break-words">
                {subtitle}
              </h3>
            ) : null}
            {title && (
              <h2 className={`text-4xl lg:text-5xl xl:text-6xl font-heading whitespace-pre-wrap break-words ${titleColor}`}>
                {title}
              </h2>
            )}
          </div>
        )}

        {description && (
          <p className={`text-xl whitespace-pre-wrap break-words max-w-4xl mx-auto text-center mb-12 ${descColor}`}>
            {description}
          </p>
        )}

        <div className="space-y-10">
          {groups.map((group, gi) => (
            <LogoRow key={gi} logos={group.logos} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompatibilityBlock;
