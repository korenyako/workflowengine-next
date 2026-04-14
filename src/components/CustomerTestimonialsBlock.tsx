import React from "react";

interface Testimonial {
  text: string;
  name: string;
  title: string;
  company: string;
}

interface CustomerTestimonialsBlockProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  blockBg?: string;
  anchor?: string;
}

const CustomerTestimonialsBlock: React.FC<CustomerTestimonialsBlockProps> = ({
  title = "What people say",
  subtitle,
  testimonials,
  blockBg,
  anchor
}) => {
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const textColor = isLightBg ? 'text-gray-600' : 'text-slate-900';

  return (
    <section id={anchor} className="py-16 px-4 sm:px-8" style={{ backgroundColor: blockBg }}>
      <div className="max-w-6xl mx-auto">
        {/* Подзаголовок */}
        {subtitle && (
          <h3 className="text-blue-600 text-lg font-subtitle font-semibold tracking-wide text-center mb-4 whitespace-pre-wrap break-words">
            {subtitle}
          </h3>
        )}
        
        {/* Заголовок */}
        <h2 className={`text-3xl lg:text-4xl font-bold text-center ${titleColor} mb-12`}>
          {title}
        </h2>
        
        {/* Отзывы в колонках */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative">
              {/* Иконка кавычки */}
              <div className="mb-4">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M27.7007 42.1875L27.7007 27.4055C27.7007 15.9975 35.1627 8.2655 45.6667 6.1875L47.6567 10.4895C42.7927 12.3235 39.6667 17.7655 39.6667 22.1875H47.6667V42.1875H27.7007ZM-0.333252 42.1875V27.4055C-0.333252 15.9975 7.16275 8.2635 17.6667 6.1875L19.6587 10.4895C14.7927 12.3235 11.6667 17.7655 11.6667 22.1875H19.6327L19.6327 42.1875L-0.333252 42.1875Z" fill="white"/>
                </svg>
              </div>
              
              {/* Текст отзыва */}
              <p className={`text-lg lg:text-xl text-slate-600 leading-normal mb-6`}>
                {testimonial.text}
              </p>
              
              {/* Имя клиента */}
              <p className="font-bold text-lg mb-1 text-blue-600">
                {testimonial.name}
              </p>
              
              {/* Должность и компания */}
              <p className="text-base text-blue-600">
                {testimonial.title}, {testimonial.company}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonialsBlock; 