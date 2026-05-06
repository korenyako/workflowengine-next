import React from "react";

interface LogosBlockProps {
  subtitle?: string;
  description?: string;
  blockBg?: string;
}

const LogosBlock: React.FC<LogosBlockProps> = ({
  subtitle = "Trusted by global organizations",
  description = "Leading companies choose WorkflowEngine for their form solutions",
}) => {
  const logos = [
    "/logos/bosch.svg",
    "/logos/engie.svg",
    "/logos/philips.svg",
    "/logos/nelnet.svg",
    "/logos/dell.svg",
    "/logos/acer.svg",
    "/logos/santos.svg",
    "/logos/ideagen.svg",
    "/logos/novartis.svg",
    "/logos/winecreate.svg",
    "/logos/processmap.svg",
    "/logos/civix.svg",
    "/logos/honda-aero.svg",
    "/logos/kpmg.svg",
    "/logos/mediaocean.svg",
    "/logos/techlogix.svg",
    "/logos/technocom.svg"
  ];

  return (
    <section className="py-12 lg:py-16">
      {/* Заголовок — по ширине контента */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-6 lg:mb-8">
          {subtitle && (
            <h3 className="text-sm uppercase tracking-[0.2em] font-mono font-medium text-[#4286F4] mb-4 whitespace-pre-wrap break-words">
              {subtitle}
            </h3>
          )}
          {description && (
            <p className="text-lg text-slate-600 whitespace-pre-wrap break-words">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Логотипы — full-bleed, чтобы лента шла edge-to-edge как у ReviewsStrip */}
      <div className="relative overflow-hidden">
        {/* Градиентная маска слева */}
        <div className="absolute left-0 top-0 w-20 h-full z-10 bg-gradient-to-r from-white to-transparent"></div>
        {/* Градиентная маска справа */}
        <div className="absolute right-0 top-0 w-20 h-full z-10 bg-gradient-to-l from-white to-transparent"></div>

        <div className="flex items-center gap-6 lg:gap-8 xl:gap-12 pr-6 lg:pr-8 xl:pr-12 animate-scroll w-max">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
            >
              <img
                src={logo}
                alt=""
                className="max-h-8 lg:max-h-12 w-auto transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosBlock; 