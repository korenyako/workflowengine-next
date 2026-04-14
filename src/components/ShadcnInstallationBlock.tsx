import React from 'react';
import { Text } from '@/components/content/Text';
import { CodeBlock } from '@/components/content/CodeBlock';

const ShadcnInstallationBlock: React.FC = () => {
  return (
    <section className="text-slate-900 py-10 md:py-14 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-slate-900 mb-6">
          Installation
        </h2>
        <div className="article-content space-y-5 font-[Space_Grotesk] text-lg lg:text-xl leading-8 text-left">
          <Text>
            Install the package along with WorkflowEngine Core. Make sure you have Tailwind CSS configured in your project:
          </Text>
          <CodeBlock
            language="bash"
            code={`npm install @react-form-builder/core @react-form-builder/components-shadcn-ui`}
          />
        </div>
      </div>
    </section>
  );
};

export default ShadcnInstallationBlock;
