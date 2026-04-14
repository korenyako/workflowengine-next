import React from "react";

interface Review {
  rating: number; // 1-5
  title: string;
  text: string;
  source?: string;
  verified?: boolean;
}

interface TrustpilotTestimonialsBlockProps {
  title: string;
  subtitle?: string;
  description?: string;
  logo?: string;
  reviews: Review[];
  blockBg?: string;
}

const TrustpilotTestimonialsBlock: React.FC<TrustpilotTestimonialsBlockProps> = ({
  title,
  subtitle,
  description,
  logo,
  reviews,
  blockBg,
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const subtitleColor = 'text-blue-600';
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-slate-600';
  const cardTextColor = isLightBg ? 'text-gray-700' : 'text-slate-900';
  const verifiedColor = 'text-green-500';

  return (
    <section className="py-16 px-4 sm:px-8" style={{ backgroundColor: blockBg }}>
      <div className="max-w-6xl mx-auto">
        {/* Header with Optimajet logo */}
        <div className="flex items-center justify-center mb-8">
          <img src="/logos/optimajet.svg" alt="Optimajet" className="h-8" />
        </div>

        {/* Main headline */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl lg:text-4xl font-bold mb-4 ${titleColor} whitespace-pre-wrap break-words`}
            dangerouslySetInnerHTML={{
              __html: title.replace('developer-friendly', '<span class="text-blue-600 font-mono">developer-friendly</span>').replace(' and ', '<br>and ')
            }}
          >
          </h2>
          {subtitle && (
            <h3 className={`text-lg font-subtitle font-semibold tracking-wide ${subtitleColor} whitespace-pre-wrap break-words leading-normal`}>
              {subtitle}
            </h3>
          )}
          {description && (
            <p className={`text-lg lg:text-xl ${descriptionColor} whitespace-pre-wrap break-words leading-normal`}>
              {description}
            </p>
          )}
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((review, idx) => (
            <div key={idx} className="text-left">
              {/* Star rating */}
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <img 
                    key={i} 
                    src="/icons/star.svg" 
                    alt="star" 
                    className="w-5 h-5"
                    style={{ opacity: i < review.rating ? 1 : 0.2 }}
                  />
                ))}
              </div>

              {/* Review title */}
              <h3 className={`font-semibold text-base mb-3 text-blue-600 whitespace-pre-wrap break-words`}>
                &ldquo;{review.title}&rdquo;
              </h3>

              {/* Review text */}
              <p className={`text-lg lg:text-xl ${isLightBg ? 'text-gray-600' : 'text-slate-600'} mb-6 leading-normal whitespace-pre-wrap break-words`}>
                {review.text}
              </p>

              {/* Trustpilot badge */}
              <div className="flex items-center gap-2 mb-2">
                <img src="/logos/trustpilot.svg" alt="Trustpilot" className="h-auto" />
              </div>

              {/* Verified reviewer */}
              {review.verified && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="#00B67A" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-sm ${isLightBg ? 'text-gray-600' : 'text-slate-600'}`}>Validated Reviewer</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustpilotTestimonialsBlock; 