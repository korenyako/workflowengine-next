import React from "react";
import {
  MousePointerClick,
  Layers,
  FilePen,
  GitFork,
  GitBranch,
  CodeXml,
  Languages,
  Move,
  Search,
  SlidersHorizontal,
  Brush,
  Save,
  Timer,
  Waypoints,
  Users,
  Database,
  Server,
  Shield,
  RotateCcw,
  Terminal,
  Headset,
  Zap,
  Infinity as InfinityIcon,
  Rocket,
  Clock,
  Monitor,
  Webhook,
  type LucideIcon,
} from "lucide-react";

const FEATURE_ICONS: Record<string, LucideIcon> = {
  "mouse-pointer-click": MousePointerClick,
  layers: Layers,
  "file-pen": FilePen,
  "git-fork": GitFork,
  "code-xml": CodeXml,
  languages: Languages,
  move: Move,
  search: Search,
  "sliders-horizontal": SlidersHorizontal,
  brush: Brush,
  save: Save,
  timer: Timer,
  branch: GitBranch,
  xml: CodeXml,
  local: Languages,
  waypoints: Waypoints,
  users: Users,
  database: Database,
  server: Server,
  shield: Shield,
  "rotate-ccw": RotateCcw,
  terminal: Terminal,
  headset: Headset,
  zap: Zap,
  infinity: InfinityIcon,
  rocket: Rocket,
  clock: Clock,
  monitor: Monitor,
  webhook: Webhook,
};

// Палитра для ротации цвета иконок в feature-карточках.
// Tailwind v4 JIT: классы должны быть строковыми литералами, чтобы попасть в bundle.
const ICON_COLORS = [
  'text-[#4286F4]',  // brand blue
  'text-[#F97316]',  // orange-500
  'text-[#A855F7]',  // purple-500
  'text-[#10B981]',  // emerald-500
  'text-[#EC4899]',  // pink-500
  'text-[#F59E0B]',  // amber-500
];

interface Feature {
  icon: string;
  title: string;
  text: string;
  bullets?: string[];
  href?: string;
  linkText?: string;
}

interface Testimonial {
  photo?: string;
  text: string;
  name: string;
  title: string;
  company: string;
}

interface FeaturesGridBlockProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  testimonial?: Testimonial;
  blockBg?: string;
  anchor?: string;
  centered?: boolean;
  iconSize?: number;
  image?: string;
  imageAlt?: string;
  columns?: 2 | 3 | 4;
}

// Tailwind v4 JIT: нельзя собирать классы динамически, поэтому литералы.
const GRID_COLS: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

const FeaturesGridBlock: React.FC<FeaturesGridBlockProps> = ({
  title,
  subtitle,
  description,
  features,
  testimonial,
  anchor,
  centered = false,
  iconSize = 24,
  image,
  imageAlt = "",
  columns = 3,
}) => {
  const testimonialParagraphs = testimonial ? testimonial.text.split("\n\n") : [];
  return (
    <section className="py-12 lg:py-16 px-4 sm:px-8" id={anchor}>
      <div className="max-w-6xl mx-auto text-center mb-12">
        {subtitle && (
          <h3 className="text-sm uppercase tracking-[0.2em] font-mono font-medium text-[#4286F4] mb-4 whitespace-pre-wrap break-words">
            {subtitle}
          </h3>
        )}
        {title && (
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading text-slate-900 mb-6 whitespace-pre-wrap break-words" style={{ wordBreak: 'keep-all' }}>
            {title.replace(/\s+for\s+/g, ' for\u00A0')}
          </h2>
        )}
        {description && <p className="text-xl text-slate-600 whitespace-pre-wrap break-words">{description}</p>}
      </div>
      <div className={`-mx-4 sm:-mx-8 grid gap-6 ${GRID_COLS[columns]}`}>
        {features.map((feature, idx) => {
          const IconComponent = FEATURE_ICONS[feature.icon];
          const iconColor = ICON_COLORS[idx % ICON_COLORS.length];
          const hasLink = !!feature.href;
          const cardClass = `bg-slate-100 rounded-3xl p-8 flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'} h-full ${hasLink ? 'group hover:bg-slate-200 transition-colors duration-200' : ''}`;
          const hasHtml = /<\/?[a-z][^>]*>/i.test(feature.text);
          const cardBody = (
            <>
              {IconComponent && <IconComponent size={iconSize} strokeWidth={2} className={`mb-4 ${iconColor}`} />}
              <h3 className="text-2xl lg:text-3xl font-heading text-slate-900 mb-3 whitespace-pre-wrap break-words">{feature.title}</h3>
              {hasHtml ? (
                <p
                  className="text-lg text-slate-600 break-words [&_a]:text-[#4286F4] [&_a]:font-medium [&_a]:underline [&_a]:decoration-[#4286F4]/30 [&_a:hover]:decoration-[#4286F4] [&_a]:underline-offset-4 [&_a]:transition-colors"
                  dangerouslySetInnerHTML={{ __html: feature.text }}
                />
              ) : (
                <p className="text-lg text-slate-600 whitespace-pre-wrap break-words">{feature.text}</p>
              )}
              {feature.bullets && feature.bullets.length > 0 && (
                <ul className="mt-4 ml-5 list-disc marker:text-[#4286F4] space-y-2 text-base text-slate-600">
                  {feature.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
              {hasLink && feature.linkText && (
                <div className="mt-6 inline-flex items-center gap-1 text-[#4286F4] font-semibold">
                  {feature.linkText}
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
                </div>
              )}
            </>
          );
          if (feature.href) {
            const isExternal = feature.href.startsWith('http');
            return (
              <a
                key={idx}
                href={feature.href}
                className={cardClass}
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                {cardBody}
              </a>
            );
          }
          return (
            <div key={idx} className={cardClass}>
              {cardBody}
            </div>
          );
        })}
      </div>

      {image && (
        <div className="max-w-6xl mx-auto mt-10">
          <img src={image} alt={imageAlt} className="w-full h-auto rounded-3xl" />
        </div>
      )}

      {testimonial && (
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 sm:p-10 lg:p-12 mt-10">
          <div className="space-y-4 mb-8">
            {testimonialParagraphs.map((p, i) => (
              <p key={i} className="text-lg lg:text-xl text-slate-900 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {testimonial.photo && (
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div>
              <p className="text-base font-semibold text-slate-900">{testimonial.name}</p>
              <p className="text-sm text-slate-500">
                {testimonial.title}, {testimonial.company}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturesGridBlock;
