import React from 'react';
import { Heading } from '@/components/content/Heading';
import { Text } from '@/components/content/Text';
import { List } from '@/components/content/List';

const MUIDocsSupportBlock: React.FC = () => {
  return (
    <section className="text-white py-10 pb-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="article-content space-y-5 font-[Space_Grotesk] text-lg lg:text-xl leading-8 text-left">
          <Heading level={2}>Documentation</Heading>
          <Text>
            For complete documentation and more examples, visit:
          </Text>
          <List
            items={[
              <><a href="https://workflowengine.io/documentation/components-library/material-ui/" className="text-blue-300 hover:text-blue-200 transition-colors">WorkflowEngine MUI Components Documentation</a></>,
              <><a href="https://workflowengine.io/documentation/" className="text-blue-300 hover:text-blue-200 transition-colors">WorkflowEngine Core Documentation</a></>,
              <><a href="https://mui.com/material-ui/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors">Material UI Documentation</a></>,
            ]}
          />

          <Heading level={2}>Support</Heading>
          <Text>
            Need help getting started? Check out our <a href="/contacts" className="text-blue-300 hover:text-blue-200 transition-colors">contact our team</a> for assistance.
          </Text>
        </div>
      </div>
    </section>
  );
};

export default MUIDocsSupportBlock;
