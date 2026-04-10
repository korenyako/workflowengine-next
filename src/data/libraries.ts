export type LibraryInfo = {
  slug: string;
  name: string;
  short: string;        // one-line value prop
  headline: string;     // H1
  subhead: string;      // lead paragraph
  statusNote: string;   // in-progress notice
  bullets: string[];     // value propositions
  githubIssue?: string; // optional link to "request support" issue template
  logo?: string;        // path to local svg/png if we have it
};

export const LIBRARIES: LibraryInfo[] = [
  {
    slug: "tailwind",
    name: "Tailwind CSS",
    short: "Utility-first styling with real-time validation.",
    headline: "Tailwind + WorkflowEngine",
    subhead: "Design, validate, and ship forms faster with Tailwind's utility classes and WorkflowEngine's logic.",
    statusNote: "Tailwind presets are in development as part of our roadmap.",
    bullets: [
      "Utility-first classes for total layout control.",
      "Real-time validation with zero configuration.",
      "Fast Vite setup for instant feedback."
    ],
    logo: "/icons/tailwind.svg"
  },
  {
    slug: "shadcn-ui",
    name: "shadcn/ui",
    short: "Modern, consistent layouts with headless primitives.",
    headline: "shadcn/ui + WorkflowEngine",
    subhead: "Pair shadcn/ui components with WorkflowEngine to keep code clean and forms consistent.",
    statusNote: "shadcn/ui kit is in development as part of our roadmap.",
    bullets: [
      "Headless components ready for custom styling.",
      "Consistent spacing and design tokens out of the box.",
      "Easy integration with WorkflowEngine's schema logic."
    ],
    logo: "/icons/shadcn.svg"
  },
  {
    slug: "mui",
    name: "MUI",
    short: "Material UI with fully customizable form logic.",
    headline: "MUI + WorkflowEngine",
    subhead: "Bring Material UI to your forms while WorkflowEngine handles complex state, validation, and workflows.",
    statusNote: "MUI integration is planned as part of our roadmap.",
    bullets: [
      "Fully themeable and accessible Material components.",
      "Syncs seamlessly with WorkflowEngine's form state.",
      "Enterprise-grade customization, powered by React."
    ],
    logo: "/icons/mui.svg"
  },
  {
    slug: "ant-design",
    name: "Ant Design",
    short: "Enterprise-ready components and validation.",
    headline: "Ant Design + WorkflowEngine",
    subhead: "Build enterprise forms with AntD while WorkflowEngine powers rules, conditions, and data mapping.",
    statusNote: "Ant Design support is planned as part of our roadmap.",
    bullets: [
      "Enterprise-ready form and table components.",
      "Internationalization and validation built in.",
      "Powerful API for structured form workflows."
    ],
    logo: "/icons/antdesign.svg"
  },
  {
    slug: "radix",
    name: "Radix",
    short: "Accessible primitives out of the box.",
    headline: "Radix + WorkflowEngine",
    subhead: "Use Radix primitives for structure and accessibility; let WorkflowEngine drive form logic.",
    statusNote: "Radix presets are in development as part of our roadmap.",
    bullets: [
      "Accessible primitives with minimal styling.",
      "Composability that matches WorkflowEngine's modular logic.",
      "Perfect for developers who prefer headless UI."
    ],
    logo: "/icons/radix.svg"
  },
  {
    slug: "mantine",
    name: "Mantine",
    short: "Polished UI with themeable styling.",
    headline: "Mantine + WorkflowEngine",
    subhead: "Combine Mantine's rich components with WorkflowEngine's schema-based logic and validation.",
    statusNote: "Mantine support is planned as part of our roadmap.",
    bullets: [
      "Beautiful, polished components out of the box.",
      "Built-in dark mode and theme system.",
      "Instantly connect to WorkflowEngine validation layers."
    ],
    logo: "/icons/mantine.svg"
  },
  {
    slug: "react-suite",
    name: "React Suite",
    short: "Modular components for complex forms.",
    headline: "React Suite + WorkflowEngine",
    subhead: "Prototype complex forms quickly using React Suite with WorkflowEngine under the hood.",
    statusNote: "React Suite integration is in development as part of our roadmap.",
    bullets: [
      "Modular components ideal for dashboards and tools.",
      "Plug in WorkflowEngine schemas with minimal boilerplate.",
      "Simplify complex forms in enterprise apps."
    ],
    logo: "/icons/rsuite.svg"
  },
  {
    slug: "chakra-ui",
    name: "Chakra UI",
    short: "Accessible, themeable layouts.",
    headline: "Chakra UI + WorkflowEngine",
    subhead: "Keep your design system consistent with Chakra while WorkflowEngine handles data and rules.",
    statusNote: "Chakra presets are planned as part of our roadmap.",
    bullets: [
      "Accessible, themeable, and responsive by default.",
      "Works seamlessly with WorkflowEngine field logic.",
      "Fast to prototype, flexible to scale."
    ],
    logo: "/icons/chakra.svg"
  },
  {
    slug: "fluent-ui",
    name: "Fluent UI",
    short: "Microsoft-style consistency.",
    headline: "Fluent UI + WorkflowEngine",
    subhead: "Ship forms that feel native to Microsoft ecosystems with minimal wiring.",
    statusNote: "Fluent UI support is planned as part of our roadmap.",
    bullets: [
      "Microsoft-style consistency for business apps.",
      "Integrates with WorkflowEngine rules and conditions.",
      "Great for internal tools and admin panels."
    ],
    logo: "/icons/fluent.svg"
  },
  {
    slug: "bootstrap",
    name: "Bootstrap",
    short: "Fast prototyping and migration.",
    headline: "Bootstrap + WorkflowEngine",
    subhead: "Migrate legacy forms or prototype quickly using Bootstrap-compatible layouts.",
    statusNote: "Bootstrap presets are planned as part of our roadmap.",
    bullets: [
      "Reliable grid system and familiar components.",
      "Easily migrate existing Bootstrap forms.",
      "WorkflowEngine adds modern logic to legacy UIs."
    ],
    logo: "/icons/bootstrap.svg"
  },
  {
    slug: "semantic-ui",
    name: "Semantic UI",
    short: "Human-readable class naming.",
    headline: "Semantic UI + WorkflowEngine",
    subhead: "Create responsive, human-readable forms with Semantic UI's natural class naming.",
    statusNote: "Semantic UI support is planned as part of our roadmap.",
    bullets: [
      "Natural language class names for readable markup.",
      "Build responsive forms with minimal setup.",
      "Combine Semantic UI design with WorkflowEngine logic."
    ],
    logo: "/icons/semantic.svg"
  },
  {
    slug: "hero-ui",
    name: "Hero UI",
    short: "Beautiful, accessible components with Tailwind integration.",
    headline: "Hero UI + WorkflowEngine",
    subhead: "Build stunning, accessible forms with Hero UI's beautiful components powered by WorkflowEngine's validation and logic.",
    statusNote: "Hero UI integration is planned as part of our roadmap.",
    bullets: [
      "Fully accessible with WAI-ARIA compliance and keyboard navigation.",
      "TypeScript-first with excellent IDE support and autocompletion.",
      "Seamless Tailwind integration with customizable component slots."
    ],
    logo: "/icons/heroui.svg"
  },
  {
    slug: "daisyui",
    name: "daisyUI",
    short: "Pure CSS component library for Tailwind with 30+ themes.",
    headline: "daisyUI + WorkflowEngine",
    subhead: "Style forms faster with daisyUI's Tailwind components while WorkflowEngine manages validation and data flow.",
    statusNote: "daisyUI support is planned as part of our roadmap.",
    bullets: [
      "Pure CSS with no JavaScript dependencies for maximum performance.",
      "30+ built-in themes with instant switching via data attributes.",
      "Reduce class names by 80% with semantic component classes."
    ],
    logo: "/icons/daisyui.svg"
  },
  {
    slug: "tamagui",
    name: "Tamagui",
    short: "Universal UI kit for React Native and Web with optimizing compiler.",
    headline: "Tamagui + WorkflowEngine",
    subhead: "Create cross-platform forms for web and native with Tamagui's universal components and WorkflowEngine's schema logic.",
    statusNote: "Tamagui integration is planned as part of our roadmap.",
    bullets: [
      "Write once, run everywhere: true cross-platform React Native + Web.",
      "Optimizing compiler flattens components for superior performance.",
      "Advanced styling with themes, animations, and responsive design."
    ],
    logo: "/icons/tamagui.svg"
  },
  {
    slug: "headless-ui",
    name: "Headless UI",
    short: "Unstyled, accessible primitives from Tailwind Labs.",
    headline: "Headless UI + WorkflowEngine",
    subhead: "Build fully custom forms with Headless UI's unstyled primitives while WorkflowEngine handles state and validation.",
    statusNote: "Headless UI support is planned as part of our roadmap.",
    bullets: [
      "Completely unstyled for total design freedom.",
      "Accessibility baked in with keyboard and screen reader support.",
      "Official Tailwind Labs components designed for Tailwind CSS."
    ],
    logo: "/icons/headlessui.svg"
  },
  {
    slug: "react-spectrum",
    name: "React Spectrum",
    short: "Adobe's adaptive design system with enterprise-grade accessibility.",
    headline: "React Spectrum + WorkflowEngine",
    subhead: "Deliver enterprise-quality forms with React Spectrum's adaptive components and WorkflowEngine's powerful logic engine.",
    statusNote: "React Spectrum integration is planned as part of our roadmap.",
    bullets: [
      "Enterprise-grade accessibility tested across devices and screen readers.",
      "Adaptive design system that responds to interaction methods.",
      "Adobe's production-proven components with internationalization built in."
    ],
    logo: "/icons/react-spectrum.svg"
  }
];

export const getLibrary = (slug: string) =>
  LIBRARIES.find(l => l.slug === slug);
