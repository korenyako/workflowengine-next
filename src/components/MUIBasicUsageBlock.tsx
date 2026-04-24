import React from "react";
import { Text } from "@/components/content/Text";
import { CodeBlock } from "@/components/content/CodeBlock";

const MUIBasicUsageBlock: React.FC = () => {
  return (
    <section className="text-slate-900 py-10 md:py-14 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading text-slate-900 mb-6 text-center">
          Basic Usage
        </h2>
        <Text className="text-center text-lg lg:text-xl font-[Space_Grotesk]">
          Here&apos;s an example of how to set up WorkflowEngine with Material UI
          components:
        </Text>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-8">
          <div className="article-content font-[Space_Grotesk]">
            <CodeBlock
              language="tsx"
              maxHeight="400px"
              code={`// Minimal MUI form example:
// JSON schema → FormViewer → live Material UI form

import { view } from "@react-form-builder/components-material-ui";
import type { FormViewerProps } from "@react-form-builder/core";
import { FormViewer } from "@react-form-builder/core";

const json = {
  errorType: 'MuiErrorWrapper',
  form: {
    key: "Screen",
    type: "Screen",
    children: [
      {
        key: "firstName",
        type: "MuiTextField",
        props: {
          label: { value: "First Name" },
          helperText: { value: "Enter your first name" },
        },
        schema: {
          validations: [
            {
              key: "required",
            },
          ],
        },
      },
      {
        key: "lastName",
        type: "MuiTextField",
        props: {
          label: { value: "Last Name" },
          helperText: { value: "Enter your last name" },
        },
        schema: {
          validations: [
            {
              key: "required",
            },
          ],
        },
      },
      {
        key: "submit",
        type: "MuiButton",
        props: {
          children: { value: "Submit" },
          variant: { value: "contained" },
          color: { value: "primary" },
        },
        events: {
          onClick: [
            {
              name: "validate",
              type: "common",
              args: {
                failOnError: true,
              },
            },
            {
              name: "onSubmit",
              type: "custom",
            },
          ],
        },
      },
    ],
  },
};

const MuiExample = () => {
  const getForm = () => JSON.stringify(json);

  const actions: FormViewerProps["actions"] = {
    onSubmit: (e) => {
      // submit the form to the backend
      alert("Form data: " + JSON.stringify(e.data));
    },
  };

  return <FormViewer view={view} getForm={getForm} actions={actions} />;
};
`}
            />
          </div>
          <div>
            <div className="flex items-center justify-center rounded-lg border-2 border-slate-300 bg-slate-100 p-8 min-h-[200px]">
              <span className="text-slate-500 text-lg">Demo placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUIBasicUsageBlock;
