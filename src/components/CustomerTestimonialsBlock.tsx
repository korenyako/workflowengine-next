'use client';

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  logo?: string;
  photo?: string;
  text: string;
  name: string;
  title: string;
  company: string;
}

interface CustomerTestimonialsBlockProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  anchor?: string;
  theme?: 'light' | 'dark';
}

const CustomerTestimonialsBlock: React.FC<CustomerTestimonialsBlockProps> = ({
  title = "What people say",
  subtitle,
  testimonials,
  anchor,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const cardBg = isDark ? 'bg-[#0f172a]' : 'bg-slate-100';
  const quoteColor = isDark ? 'text-white' : 'text-slate-900';
  const nameColor = isDark ? 'text-white' : 'text-slate-900';
  const metaColor = isDark ? 'text-slate-400' : 'text-slate-500';
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  const paragraphs = current.text.split("\n\n");
  const total = testimonials.length;
  const hasCarousel = total > 1;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section id={anchor} className="py-12 lg:py-16 px-4 sm:px-8">
      <div>
        {subtitle && (
          <h3 className="max-w-6xl mx-auto text-sm uppercase font-mono font-medium tracking-[0.2em] text-[#4286F4] text-center mb-4 whitespace-pre-wrap break-words">
            {subtitle}
          </h3>
        )}

        {title && (
          <h2 className="max-w-6xl mx-auto text-4xl lg:text-5xl xl:text-6xl font-heading text-slate-900 text-center mb-16">
            {title}
          </h2>
        )}

        <div className="-mx-4 sm:-mx-8 flex items-center gap-3 sm:gap-6 lg:gap-8">
          {hasCarousel && (
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-600 transition-opacity duration-200 hover:opacity-60 cursor-pointer"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
          )}

          <div className={`flex-1 ${cardBg} rounded-3xl p-8 sm:p-12 lg:p-16`}>
            <div className="space-y-6 mb-10">
              {paragraphs.map((p, i) => (
                <p key={i} className={`text-2xl md:text-3xl lg:text-4xl font-heading tracking-normal! leading-snug ${quoteColor}`}>
                  {p}
                </p>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {current.photo && (
                <img
                  src={current.photo}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div>
                <p className={`text-lg font-semibold ${nameColor}`}>{current.name}</p>
                <p className={`text-base ${metaColor}`}>
                  {current.title}, {current.company}
                </p>
              </div>
            </div>
          </div>

          {hasCarousel && (
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-600 transition-opacity duration-200 hover:opacity-60 cursor-pointer"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          )}
        </div>

        {hasCarousel && (
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors duration-200 cursor-pointer ${
                  i === index ? "bg-[#4286F4]" : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerTestimonialsBlock;
