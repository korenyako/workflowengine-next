import React from 'react';
import { Text } from '@/components/content/Text';
import { CodeBlock } from '@/components/content/CodeBlock';

const ShadcnBasicUsageBlock: React.FC = () => {
  return (
    <section className="text-white py-10 md:py-14 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white mb-6">
          Basic Usage
        </h2>
        <div className="article-content space-y-5 font-[Space_Grotesk] text-lg lg:text-xl leading-8 text-left">
          <Text>
            Here&apos;s an example of how to set up WorkflowEngine with shadcn/ui components:
          </Text>
          <CodeBlock
            language="tsx"
            maxHeight="550px"
            code={`import {buildForm} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {builderView} from '@react-form-builder/components-shadcn-ui'

const simpleForm = buildForm({errorType: 'ShadcnErrorWrapper'})
  .component('firstName', 'ShadcnInput')
  .prop('placeholder', 'Enter your first name')
  .prop('label', 'First Name')
  .validation('required')

  .component('lastName', 'ShadcnInput')
  .prop('placeholder', 'Enter your last name')
  .prop('label', 'Last Name')
  .validation('required')

  .component('submit', 'ShadcnButton')
  .prop('children', 'Submit')
  .prop('variant', 'default')
  .event('onClick')
  .commonAction('validate').args({failOnError: true})
  .customAction('onSubmit')
  .json()

export const BuilderApp = () => {
  return <FormBuilder
    view={builderView}
    getForm={() => simpleForm}
    actions={{
      onSubmit: (e) => {
        // submit the form to the backend
        alert('Form data: ' + JSON.stringify(e.data))
      },
    }}
  />
}`}
          />
        </div>
      </div>
    </section>
  );
};

export default ShadcnBasicUsageBlock;
