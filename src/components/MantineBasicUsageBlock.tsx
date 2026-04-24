import React from 'react';
import { Text } from '@/components/content/Text';
import { CodeBlock } from '@/components/content/CodeBlock';

const MantineBasicUsageBlock: React.FC = () => {
  return (
    <section className="text-slate-900 py-10 md:py-14 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading text-slate-900 mb-6 text-center">
          Basic Usage
        </h2>
        <div className="article-content space-y-5 font-[Space_Grotesk] text-lg lg:text-xl leading-8">
          <Text className="text-center">
            Here&apos;s an example of how to set up WorkflowEngine with Mantine components:
          </Text>
          <CodeBlock
            language="tsx"
            maxHeight="550px"
            code={`import {view} from '@react-form-builder/components-mantine'
import {buildForm, FormViewer} from '@react-form-builder/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

const simpleForm = buildForm()
  .component('container', 'MtContainer')
  .style({flexDirection: 'row'})
  .children((builder) =>
    builder
      .component('firstName', 'MtTextInput')
      .prop('placeholder', 'Enter your first name')
      .prop('label', 'First Name')
      .validation('required')

      .component('lastName', 'MtTextInput')
      .prop('placeholder', 'Enter your last name')
      .prop('label', 'Last Name')
      .validation('required')
  )

  .component('birthDate', 'MtDatePickerInput')
  .prop('label', 'Birth Date')
  .validation('min').args({value: '1980-01-07T00:00:00.000Z'})

  .component('submit', 'MtButton')
  .prop('children', 'Submit')
  .event('onClick')
  .commonAction('validate').args({failOnError: true})
  .customAction('onSubmit')
  .json()

export const App = () => {
  return <FormViewer
    view={view}
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
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center rounded-lg border-2 border-slate-300 bg-slate-100 p-8 min-h-[200px]">
          <span className="text-slate-500 text-lg">Demo placeholder</span>
        </div>
      </div>
    </section>
  );
};

export default MantineBasicUsageBlock;
