import React from "react";

interface DesignerScreenshotBlockProps {
  image: {
    src: string;
    alt: string;
  };
  caption?: string;
}

const DesignerScreenshotBlock: React.FC<DesignerScreenshotBlockProps> = ({
  image,
  caption,
}) => {
  return (
    <section className="py-12 lg:py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-white p-4 sm:p-6 lg:p-12">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto block"
            loading="lazy"
            decoding="async"
          />
        </div>
        {caption && (
          <p className="text-sm text-slate-500 text-center mt-4 whitespace-pre-wrap break-words">
            {caption}
          </p>
        )}
      </div>
    </section>
  );
};

export default DesignerScreenshotBlock;
