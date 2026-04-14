import React from "react";
import Button from "./Button";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  title: string;
  faqItems: FAQItem[];
  blockBg?: string;
  anchor?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

const FAQBlock: React.FC<FAQBlockProps> = ({ title, faqItems, blockBg, anchor, primaryCta, secondaryCta }) => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(item.answer),
      },
    })),
  };

  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';

  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const subtitleColor = isLightBg ? 'text-gray-600' : 'text-slate-600';
  const questionColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const answerColor = isLightBg ? 'text-gray-600' : 'text-slate-600';
  const linkColor = 'text-blue-600 hover:text-blue-700';

  // Разделяем FAQ на 3 колонки
  const column1 = faqItems.filter((_, idx) => idx % 3 === 0);
  const column2 = faqItems.filter((_, idx) => idx % 3 === 1);
  const column3 = faqItems.filter((_, idx) => idx % 3 === 2);

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <section id={anchor} className="pt-16 pb-24 px-4 sm:px-8" style={{ backgroundColor: blockBg }}>
      <div className="max-w-6xl mx-auto">
        {/* Заголовок и подзаголовки */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-semibold text-slate-900 mb-4 leading-snug whitespace-pre-wrap break-words" style={{ wordBreak: 'keep-all' }}>
            {title.replace(/\s+for\s+/g, ' for\u00A0')}
          </h2>
        </div>

        {/* Сетка FAQ в 3 колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Колонка 1 */}
          <div className="space-y-8">
            {column1.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className={`font-semibold text-lg text-blue-600 whitespace-pre-wrap break-words`}>
                  {item.question}
                </h3>
                <p
                  className={`text-lg lg:text-xl ${isLightBg ? 'text-gray-600' : 'text-slate-600'} whitespace-pre-wrap break-words leading-normal`}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            ))}
          </div>
          
          {/* Колонка 2 */}
          <div className="space-y-8">
            {column2.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className={`font-semibold text-lg text-blue-600 whitespace-pre-wrap break-words`}>
                  {item.question}
                </h3>
                <p
                  className={`text-lg lg:text-xl ${isLightBg ? 'text-gray-600' : 'text-slate-600'} whitespace-pre-wrap break-words leading-normal`}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            ))}
          </div>
          
          {/* Колонка 3 */}
          <div className="space-y-8">
            {column3.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className={`font-semibold text-lg text-blue-600 whitespace-pre-wrap break-words`}>
                  {item.question}
                </h3>
                <p
                  className={`text-lg lg:text-xl ${isLightBg ? 'text-gray-600' : 'text-slate-600'} whitespace-pre-wrap break-words leading-normal`}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Кнопки CTA */}
        {(primaryCta || secondaryCta) && (
          <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant="secondary"
                  size="lg"
                  isLightBg={isLightBg}
                >
                  {secondaryCta.text}
                </Button>
              )}
              {primaryCta && (
                <Button
                  href={primaryCta.href}
                  variant="primary"
                  size="lg"
                  isLightBg={isLightBg}
                  {...(primaryCta.href.startsWith('https://workflowengine.io/') ? {} : { target: '_blank' })}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {primaryCta.text}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default FAQBlock; 