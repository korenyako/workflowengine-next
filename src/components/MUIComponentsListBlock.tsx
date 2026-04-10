import React from 'react';
import WorkflowEngineComponentsBlock from '@/components/WorkflowEngineComponentsBlock';

const MUIComponentsListBlock: React.FC = () => {
  return (
    <WorkflowEngineComponentsBlock
      title="Available Components"
      components={[
        {
          name: "Input Components",
          chips: [
            { label: "TextField", url: "https://workflowengine.io/documentation/components-library/material-ui/text-field" },
            { label: "Select", url: "https://workflowengine.io/documentation/components-library/material-ui/select" },
            { label: "Checkbox", url: "https://workflowengine.io/documentation/components-library/material-ui/checkbox" },
            { label: "RadioGroup", url: "https://workflowengine.io/documentation/components-library/material-ui/radio-group" },
            { label: "RadioItem", url: "https://workflowengine.io/documentation/components-library/material-ui/radio-item" },
            { label: "Switch", url: "https://workflowengine.io/documentation/components-library/material-ui/switch" },
            { label: "Uploader", url: "https://workflowengine.io/documentation/components-library/material-ui/uploader" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/material-ui/",
          icon: "ContainerIcon"
        },
        {
          name: "Form Components",
          chips: [
            { label: "FormControlLabel", url: "https://workflowengine.io/documentation/components-library/material-ui/form-control-label" },
            { label: "FormLabel", url: "https://workflowengine.io/documentation/components-library/material-ui/form-label" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/material-ui/",
          icon: "RepeaterIcon"
        },
        {
          name: "Layout Components",
          chips: [
            { label: "Box", url: "https://workflowengine.io/documentation/components-library/material-ui/box" },
            { label: "Container", url: "https://workflowengine.io/documentation/components-library/material-ui/container" },
            { label: "Stack", url: "https://workflowengine.io/documentation/components-library/material-ui/stack" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/material-ui/",
          icon: "ContainerIcon"
        },
        {
          name: "Navigation Components",
          chips: [
            { label: "Breadcrumbs", url: "https://workflowengine.io/documentation/components-library/material-ui/breadcrumbs" },
            { label: "Link", url: "https://workflowengine.io/documentation/components-library/material-ui/link" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/material-ui/",
          icon: "RepeaterIcon"
        },
        {
          name: "Data Display Components",
          chips: [
            { label: "Card", url: "https://workflowengine.io/documentation/components-library/material-ui/card" },
            { label: "List", url: "https://workflowengine.io/documentation/components-library/material-ui/list" },
            { label: "ListItem", url: "https://workflowengine.io/documentation/components-library/material-ui/list-item" },
            { label: "Typography", url: "https://workflowengine.io/documentation/components-library/material-ui/typography" },
            { label: "Tooltip", url: "https://workflowengine.io/documentation/components-library/material-ui/tooltip" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/material-ui/",
          icon: "DataGridIcon"
        },
        {
          name: "Feedback Components",
          chips: [
            { label: "CircularProgress", url: "https://workflowengine.io/documentation/components-library/material-ui/circular-progress" },
            { label: "LinearProgress", url: "https://workflowengine.io/documentation/components-library/material-ui/linear-progress" },
            { label: "ErrorWrapper", url: "https://workflowengine.io/documentation/components-library/material-ui/error-wrapper" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/material-ui/",
          icon: "RepeaterIcon"
        },
        {
          name: "Button Components",
          chips: [
            { label: "Button", url: "https://workflowengine.io/documentation/components-library/material-ui/button" },
            { label: "ButtonGroup", url: "https://workflowengine.io/documentation/components-library/material-ui/button-group" },
          ],
          documentationUrl: "https://workflowengine.io/documentation/components-library/material-ui/",
          icon: "ContainerIcon"
        }
      ]}
    />
  );
};

export default MUIComponentsListBlock;
