'use client';

import React from "react";
import Link from "next/link";

interface Metric {
  value: string;
  label: string;
}

interface CustomerStoryBlockProps {
  eyebrow?: string;
  logo?: string;
  logoAlt?: string;
  logoHeight?: string;
  title: string;
  metrics?: Metric[];
  image: string;
  imageAlt?: string;
  href?: string;
  linkText?: string;
  imageSide?: 'left' | 'right';
}

const CustomerStoryBlock: React.FC<CustomerStoryBlockProps> = ({
  eyebrow,
  logo,
  logoAlt = "",
  logoHeight = "h-10",
  title,
  metrics,
  image,
  imageAlt = "",
  href,
  linkText = "Read story",
  imageSide = 'right',
}) => {
  const isExternal = !!href && href.startsWith('http');
  const cardClass = "group block -mx-4 sm:-mx-6 lg:-mx-8 rounded-3xl overflow-hidden bg-slate-100 grid grid-cols-1 lg:grid-cols-2";
  const readStory = (
    <span className="inline-flex items-center gap-1 text-[#4286F4] group-hover:text-[#2e6ad4] transition-colors text-base font-semibold">
      {linkText}
      <span className="relative inline-flex w-[18px] h-[18px] transition-transform duration-200 group-hover:translate-x-1">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-0"
          aria-hidden
        >
          <path
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-hidden
        >
          <path
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );

  const cardInner = (
    <>
      <div className={`p-8 sm:p-10 lg:p-14 flex flex-col justify-between gap-16 min-h-[320px] lg:min-h-[420px] ${imageSide === 'left' ? 'lg:order-2' : ''}`}>
        <div>
          {eyebrow && (
            <div className="text-sm uppercase tracking-[0.2em] font-mono font-medium text-[#4286F4] mb-6">
              {eyebrow}
            </div>
          )}
          {logo && (
            <img src={logo} alt={logoAlt} className={`${logoHeight} w-auto mb-6`} />
          )}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading tracking-normal! text-slate-900 leading-snug mb-6">
            {title}
          </h3>
          {href && readStory}
        </div>
        {metrics && metrics.length > 0 && (
          <div className="flex flex-wrap gap-x-10 gap-y-6 lg:gap-x-12">
            {metrics.map((m, i) => (
              <div key={i} className="max-w-[14rem]">
                <div className="text-5xl lg:text-6xl font-heading text-slate-900 mb-2">{m.value}</div>
                <div className="text-sm text-slate-600 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={`relative min-h-[240px] lg:min-h-full overflow-hidden ${imageSide === 'left' ? 'lg:order-1' : ''}`}>
        <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
    </>
  );

  return (
    <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      {!href ? (
        <div className={cardClass}>{cardInner}</div>
      ) : isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
          {cardInner}
        </a>
      ) : (
        <Link href={href} prefetch={false} className={cardClass}>
          {cardInner}
        </Link>
      )}
    </section>
  );
};

export default CustomerStoryBlock;
