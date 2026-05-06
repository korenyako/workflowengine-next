'use client';

import { useEffect, useLayoutEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Review {
  source?: string;
  rating: number;
  text: string;
  name: string;
  title?: string;
  href?: string;
}

interface ReviewsStripBlockProps {
  subtitle?: string;
  title?: string;
  reviews: Review[];
  anchor?: string;
}

const ReviewsStripBlock: React.FC<ReviewsStripBlockProps> = ({
  subtitle,
  title,
  reviews,
  anchor,
}) => {
  const stripRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);

  const triplicated = [...reviews, ...reviews, ...reviews];

  const measureSetWidth = () => {
    const strip = stripRef.current;
    if (!strip || reviews.length === 0) return 0;
    const cards = strip.querySelectorAll<HTMLElement>("[data-review-card]");
    if (cards.length < reviews.length + 1) return 0;
    return cards[reviews.length].offsetLeft - cards[0].offsetLeft;
  };

  useLayoutEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const setWidth = measureSetWidth();
    setWidthRef.current = setWidth;
    strip.scrollTo({ left: setWidth, behavior: "instant" as ScrollBehavior });
  }, [reviews.length]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const onResize = () => {
      setWidthRef.current = measureSetWidth();
    };

    const onScroll = () => {
      const setWidth = setWidthRef.current;
      if (!setWidth) return;
      const { scrollLeft } = strip;
      if (scrollLeft >= setWidth * 2) {
        strip.scrollTo({ left: scrollLeft - setWidth, behavior: "instant" as ScrollBehavior });
      } else if (scrollLeft < setWidth * 0.5) {
        strip.scrollTo({ left: scrollLeft + setWidth, behavior: "instant" as ScrollBehavior });
      }
    };

    strip.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      strip.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const strip = stripRef.current;
    if (!strip) return;
    const firstCard = strip.querySelector<HTMLElement>("[data-review-card]");
    if (!firstCard) return;
    const gap = parseFloat(getComputedStyle(strip.firstElementChild as HTMLElement).gap) || 0;
    strip.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section id={anchor} className="py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-12 text-center">
        {subtitle && (
          <h3 className="text-sm uppercase tracking-[0.2em] font-mono font-medium text-[#4286F4] mb-4 whitespace-pre-wrap break-words">
            {subtitle}
          </h3>
        )}
        {title && (
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading text-slate-900 whitespace-pre-wrap break-words">
            {title}
          </h2>
        )}
      </div>

      <div
        ref={stripRef}
        className="-mx-4 sm:-mx-12 lg:-mx-16 xl:-mx-32 2xl:-mx-64 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-4 lg:gap-6 pr-4 pl-4 sm:pl-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          {triplicated.map((r, i) => {
            const cardClass = "shrink-0 w-[320px] aspect-square bg-slate-100 rounded-3xl p-6 flex flex-col transition-opacity duration-200";
            const inner = (
              <>
                <div className="flex items-center justify-between mb-4">
                  {r.source && (
                    <img src={r.source} alt="" className="h-6 w-auto" />
                  )}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        strokeWidth={0}
                        className={idx < r.rating ? "fill-[#fbbf24]" : "fill-slate-300"}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-lg text-slate-900 leading-relaxed flex-1 overflow-hidden">
                  {r.text}
                </p>

                <div className="mt-4">
                  <p className="text-base font-semibold text-slate-900">{r.name}</p>
                  {r.title && <p className="text-sm text-slate-500">{r.title}</p>}
                </div>
              </>
            );
            return r.href ? (
              <a
                key={i}
                data-review-card
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} hover:opacity-80`}
              >
                {inner}
              </a>
            ) : (
              <div key={i} data-review-card className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-8 flex gap-3">
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous reviews"
          className="w-12 h-12 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-600 transition-opacity duration-200 hover:opacity-60 cursor-pointer"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next reviews"
          className="w-12 h-12 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-600 transition-opacity duration-200 hover:opacity-60 cursor-pointer"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
};

export default ReviewsStripBlock;
