import React from "react";

interface Testimonial {
  text: string;
  author: string;
  role?: string;
}

interface TestimonialsBlockProps {
  title: string;
  testimonials: Testimonial[];
  blockBg?: string;
}

const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({ 
  title, 
  testimonials, 
  blockBg 
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-white';
  const cardBg = isLightBg ? 'bg-gray-50' : 'bg-gray-800';
  const cardBorder = isLightBg ? 'border-gray-100' : 'border-gray-700';
  const cardTextColor = isLightBg ? 'text-gray-700' : 'text-gray-300';
  const cardAuthorColor = isLightBg ? 'text-gray-900' : 'text-white';
  const cardRoleColor = isLightBg ? 'text-gray-500' : 'text-gray-400';

  return (
    <section className="py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className={`font-bold ${titleColor} whitespace-pre-wrap break-words`}>{title}</h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className={`${cardBg} rounded-xl p-8 flex flex-col items-center text-center h-full border ${cardBorder}`}>
            <p className={`text-lg italic mb-6 ${cardTextColor} whitespace-pre-wrap break-words`}>"{t.text}"</p>
            <div className={`font-semibold ${cardAuthorColor} whitespace-pre-wrap break-words`}>{t.author}</div>
            {t.role && <div className={`text-sm ${cardRoleColor} whitespace-pre-wrap break-words`}>{t.role}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsBlock; 