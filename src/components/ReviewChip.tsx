import React, { useId } from "react";

interface ReviewChipProps {
  logo: string;
  sourceLabel: string;
  rating: number;
  href: string;
}

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

const PartialStar: React.FC<{ fraction: number; size?: number }> = ({ fraction, size = 14 }) => {
  const id = useId();
  const pct = Math.min(Math.max(fraction, 0), 1) * 100;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset={`${pct}%`} stopColor="#fbbf24" />
          <stop offset={`${pct}%`} stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
      <path d={STAR_PATH} fill={`url(#${id})`} />
    </svg>
  );
};

const ReviewChip: React.FC<ReviewChipProps> = ({ logo, sourceLabel, rating, href }) => {
  const fractions = Array.from({ length: 5 }, (_, i) => rating - i);
  const display = rating.toFixed(1).replace(".", ",");
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`${sourceLabel} — rated ${display} out of 5`}
      className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-slate-300 text-slate-900 transition-opacity duration-200 hover:opacity-70"
    >
      <img src={logo} alt={sourceLabel} className="h-6 w-auto" />
      <span className="flex gap-1">
        {fractions.map((f, i) => (
          <PartialStar key={i} fraction={f} size={20} />
        ))}
      </span>
      <span className="text-base font-semibold">{display}</span>
    </a>
  );
};

export default ReviewChip;
