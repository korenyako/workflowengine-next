import React from 'react';
import WorkflowEngineComponentsBlock from '@/components/WorkflowEngineComponentsBlock';

const ShadcnComponentsListBlock: React.FC = () => {
  return (
    <WorkflowEngineComponentsBlock
      title="Available Components"
      components={[
        {
          name: "Input Components",
          chips: [
            { label: "Input", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/input" },
            { label: "Textarea", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/textarea" },
            { label: "Select", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/select" },
            { label: "Checkbox", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/checkbox" },
            { label: "RadioGroup", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/radio-group" },
            { label: "Switch", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/switch" },
            { label: "Slider", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/slider" },
            { label: "Combobox", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/combobox" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/shadcn-ui/",
          icon: "ContainerIcon"
        },
        {
          name: "Date & Time Components",
          chips: [
            { label: "Calendar", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/calendar" },
            { label: "DatePicker", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/date-picker" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/shadcn-ui/",
          icon: "RepeaterIcon"
        },
        {
          name: "Layout Components",
          chips: [
            { label: "Card", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/card" },
            { label: "Separator", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/separator" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/shadcn-ui/",
          icon: "ContainerIcon"
        },
        {
          name: "Data Display Components",
          chips: [
            { label: "Label", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/label" },
            { label: "Badge", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/badge" },
            { label: "Tooltip", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/tooltip" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/shadcn-ui/",
          icon: "DataGridIcon"
        },
        {
          name: "Feedback Components",
          chips: [
            { label: "Alert", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/alert" },
            { label: "Progress", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/progress" },
            { label: "ErrorWrapper", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/error-wrapper" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/shadcn-ui/",
          icon: "RepeaterIcon"
        },
        {
          name: "Button Components",
          chips: [
            { label: "Button", url: "https://workflowengine.io/documentation/components-library/shadcn-ui/button" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/shadcn-ui/",
          icon: "ContainerIcon"
        }
      ]}
    />
  );
};

export default ShadcnComponentsListBlock;
