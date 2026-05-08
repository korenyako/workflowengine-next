import React from "react";
import Button from "./Button";

interface CenteredVideoBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  video: {
    youtubeId: string;
    title: string;
  };
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  note?: string;
  blockBg?: string;
  anchor?: string;
}

const CenteredVideoBlock: React.FC<CenteredVideoBlockProps> = ({
  title,
  subtitle,
  description,
  video,
  primaryCta,
  secondaryCta,
  note,
  anchor,
}) => {
  return (
    <section
      className="py-8 lg:py-16 px-4 sm:px-8"
      id={anchor}
      style={anchor ? { scrollMarginTop: '100px' } : {}}
    >
      <div className="max-w-6xl mx-auto text-center">
        {subtitle && (
          <h3 className="text-sm uppercase font-mono font-medium tracking-[0.2em] text-[#4286F4] mb-4 whitespace-pre-wrap break-words">
            {subtitle}
          </h3>
        )}

        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading text-slate-900 mb-6 whitespace-pre-wrap break-words">
          {title}
        </h2>

        <p className="text-lg lg:text-xl mb-8 lg:mb-16 leading-normal text-slate-600 whitespace-pre-wrap break-words">
          {description}
        </p>

        <div className="mb-8">
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            {primaryCta && (
              <Button href={primaryCta.href} variant="primary" size="lg" className="w-full sm:w-auto">
                {primaryCta.text}
              </Button>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="secondary" size="lg" className="w-full sm:w-auto">
                {secondaryCta.text}
              </Button>
            )}
          </div>
        )}

        {note && (
          <div className="text-center">
            <p className="text-sm text-slate-500 whitespace-pre-wrap break-words">{note}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CenteredVideoBlock;
