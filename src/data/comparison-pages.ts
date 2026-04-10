export type ComparisonPageData = {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string;
};

export const comparisonPages: ComparisonPageData[] = [
  {
    slug: 'react-hook-form-alternative',
    name: 'React Hook Form',
    title: 'WorkflowEngine: The Best React Hook Form Alternative for Faster Form Building and Easier Maintenance',
    description: 'We\'re preparing a detailed comparison between WorkflowEngine and React Hook Form. Our goal is to highlight the key differences — from data handling and validation to developer experience and flexibility.',
    keywords: 'react hook form alternative, workflowengine, react form builder, drag and drop forms',
  },
  {
    slug: 'tanstack-form-alternative',
    name: 'TanStack Form',
    title: 'WorkflowEngine: The Best TanStack Form Alternative for Faster Form Building',
    description: 'We\'re preparing a detailed comparison between WorkflowEngine and TanStack Form. Our goal is to highlight the key differences — from data handling and validation to developer experience.',
    keywords: 'tanstack form alternative, workflowengine, react form builder',
  },
  {
    slug: 'react-final-form-alternative',
    name: 'React Final Form',
    title: 'WorkflowEngine: The Best React Final Form Alternative for Modern React Apps',
    description: 'We\'re preparing a detailed comparison between WorkflowEngine and React Final Form. Our goal is to highlight the key differences — from data handling and validation to developer experience.',
    keywords: 'react final form alternative, workflowengine, react form builder',
  },
  {
    slug: 'react-jsonschema-form-alternative',
    name: 'React JSONSchema Form',
    title: 'React JSON Schema Form Alternative: WorkflowEngine vs RJSF Bundle Size Comparison',
    description: 'Discover WorkflowEngine - a lightweight React JSON Schema form alternative to RJSF. Compare bundle sizes, performance, and features to find the best solution.',
    keywords: 'react jsonschema form alternative, rjsf vs workflowengine, json schema form comparison, react form builder, bundle size comparison, workflowengine',
  },
  {
    slug: 'uniforms-alternative',
    name: 'Uniforms',
    title: 'WorkflowEngine: The Best Uniforms Alternative for Schema-Based Forms',
    description: 'We\'re preparing a detailed comparison between WorkflowEngine and Uniforms. Our goal is to highlight the key differences in schema-based form creation.',
    keywords: 'uniforms alternative, workflowengine, schema forms',
  },
  {
    slug: 'surveyjs-alternative',
    name: 'SurveyJS',
    title: 'WorkflowEngine: The Best SurveyJS Alternative for Modern React Form Design',
    description: 'We\'re preparing a detailed comparison between WorkflowEngine and SurveyJS. Our goal is to highlight the key differences in visual form design.',
    keywords: 'surveyjs alternative, workflowengine, form builder',
  },
  {
    slug: 'formik-alternative',
    name: 'Formik',
    title: 'WorkflowEngine: The Best Formik Alternative for React Forms',
    description: 'We\'re preparing a detailed comparison between WorkflowEngine and Formik. Our goal is to highlight the key differences in form handling.',
    keywords: 'formik alternative, workflowengine, react forms',
  },
  {
    slug: 'formily-alternative',
    name: 'Formily',
    title: 'WorkflowEngine: The Best Formily Alternative for Enterprise Forms',
    description: 'We\'re preparing a detailed comparison between WorkflowEngine and Formily. Our goal is to highlight the key differences in enterprise form development.',
    keywords: 'formily alternative, workflowengine, enterprise forms',
  },
  {
    slug: 'ant-design-form-alternative',
    name: 'Ant Design Form',
    title: 'WorkflowEngine: The Best Ant Design Form Alternative',
    description: 'We\'re preparing a detailed comparison between WorkflowEngine and Ant Design Form. Our goal is to highlight the key differences.',
    keywords: 'ant design form alternative, workflowengine, antd forms',
  },
  {
    slug: 'react-schema-form-alternative',
    name: 'React Schema Form',
    title: 'WorkflowEngine: The Best React Schema Form Alternative',
    description: 'We\'re preparing a detailed comparison between WorkflowEngine and React Schema Form. Our goal is to highlight the key differences in schema-based form development.',
    keywords: 'react schema form alternative, workflowengine',
  },
];

export function getComparisonPageBySlug(slug: string): ComparisonPageData | undefined {
  return comparisonPages.find(page => page.slug === slug);
}
