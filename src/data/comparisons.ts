export type ComparisonItem = {
  name: string;
  href: string;
  shortDescription: string;
  ariaLabel: string;
};

export const comparisons: ComparisonItem[] = [
  {
    name: 'React Hook Form',
    href: '/comparison/react-hook-form-alternative/',
    shortDescription: 'Performance-focused forms with minimal re-renders vs a full-featured form engine.',
    ariaLabel: 'WorkflowEngine vs React Hook Form — read the comparison',
  },
  {
    name: 'TanStack Form',
    href: '/comparison/tanstack-form-alternative/',
    shortDescription: 'Headless form primitives vs an end-to-end configurable engine.',
    ariaLabel: 'WorkflowEngine vs TanStack Form — read the comparison',
  },
  {
    name: 'React Final Form',
    href: '/comparison/react-final-form-alternative/',
    shortDescription: 'Ultimate alternative for teams who value speed and simplicity.',
    ariaLabel: 'WorkflowEngine vs React Final Form — read the comparison',
  },
  {
    name: 'React JSONSchema Form',
    href: '/comparison/react-jsonschema-form-alternative/',
    shortDescription: 'Modern RJSF alternative for effortless schema-driven development.',
    ariaLabel: 'WorkflowEngine vs React JSONSchema Form — read the comparison',
  },
  {
    name: 'Uniforms',
    href: '/comparison/uniforms-alternative/',
    shortDescription: 'Visual alternative for faster schema-based form creation.',
    ariaLabel: 'WorkflowEngine vs Uniforms — read the comparison',
  },
  {
    name: 'SurveyJS',
    href: '/comparison/surveyjs-alternative/',
    shortDescription: 'Affordable alternative for modern, visual React form design.',
    ariaLabel: 'WorkflowEngine vs SurveyJS — read the comparison',
  },
];
