import React from 'react';
import WorkflowEngineComponentsBlock from '@/components/WorkflowEngineComponentsBlock';

const BASE = "https://workflowengine.io/documentation/components-library/mantine";

const MantineComponentsListBlock: React.FC = () => {
  return (
    <WorkflowEngineComponentsBlock
      title="Available Components"
      components={[
        {
          name: "Inputs",
          chips: [
            { label: "MtCheckbox", url: `${BASE}/checkbox` },
            { label: "MtCheckboxGroup", url: `${BASE}/checkbox-group` },
            { label: "MtChip", url: `${BASE}/chip` },
            { label: "MtChipCheckboxGroup", url: `${BASE}/chip-group` },
            { label: "MtChipRadioGroup", url: `${BASE}/chip-radio-group` },
            { label: "MtColorInput", url: `${BASE}/color-input` },
            { label: "MtColorPicker", url: `${BASE}/color-picker` },
            { label: "MtFileInput", url: `${BASE}/file-input` },
            { label: "MtDropzone", url: `${BASE}/dropzone` },
            { label: "MtJsonInput", url: `${BASE}/json-input` },
            { label: "MtLabel", url: `${BASE}/label` },
            { label: "MtNumberInput", url: `${BASE}/number-input` },
            { label: "MtPasswordInput", url: `${BASE}/password-input` },
            { label: "MtRadio", url: `${BASE}/radio` },
            { label: "MtRadioGroup", url: `${BASE}/radio-group` },
            { label: "MtRangeSlider", url: `${BASE}/range-slider` },
            { label: "MtRating", url: `${BASE}/rating` },
            { label: "MtSegmentedControl", url: `${BASE}/segmented-control` },
            { label: "MtSlider", url: `${BASE}/slider` },
            { label: "MtSwitch", url: `${BASE}/switch` },
            { label: "MtSwitchGroup", url: `${BASE}/switch-group` },
            { label: "MtTextInput", url: `${BASE}/text-input` },
            { label: "MtTextarea", url: `${BASE}/textarea` },
          ],
          documentationUrl: `${BASE}/#inputs`,
          icon: "ContainerIcon"
        },
        {
          name: "Combobox and Select",
          chips: [
            { label: "MtAutocomplete", url: `${BASE}/autocomplete` },
            { label: "MtMultiSelect", url: `${BASE}/multi-select` },
            { label: "MtNativeSelect", url: `${BASE}/native-select` },
            { label: "MtSelect", url: `${BASE}/select` },
            { label: "MtTagsInput", url: `${BASE}/tags-input` },
          ],
          documentationUrl: `${BASE}/#combobox-and-select`,
          icon: "ContainerIcon"
        },
        {
          name: "Date and Time",
          chips: [
            { label: "MtDateMultiplePicker", url: `${BASE}/date-multiple-picker` },
            { label: "MtDateMultiplePickerInput", url: `${BASE}/date-multiple-picker-input` },
            { label: "MtDatePicker", url: `${BASE}/date-picker` },
            { label: "MtDatePickerInput", url: `${BASE}/date-picker-input` },
            { label: "MtDateRangePicker", url: `${BASE}/date-range-picker` },
            { label: "MtDateRangePickerInput", url: `${BASE}/date-range-picker-input` },
            { label: "MtDateTimePicker", url: `${BASE}/date-time-picker` },
            { label: "MtMonthMultiplePicker", url: `${BASE}/month-multiple-picker` },
            { label: "MtMonthMultiplePickerInput", url: `${BASE}/month-multiple-picker-input` },
            { label: "MtMonthPicker", url: `${BASE}/month-picker` },
            { label: "MtMonthPickerInput", url: `${BASE}/month-picker-input` },
            { label: "MtMonthRangePicker", url: `${BASE}/month-range-picker` },
            { label: "MtMonthRangePickerInput", url: `${BASE}/month-range-picker-input` },
            { label: "MtTimeGrid", url: `${BASE}/time-grid` },
            { label: "MtTimeInput", url: `${BASE}/time-input` },
            { label: "MtTimePicker", url: `${BASE}/time-picker` },
            { label: "MtYearMultiplePicker", url: `${BASE}/year-multiple-picker` },
            { label: "MtYearMultiplePickerInput", url: `${BASE}/year-multiple-picker-input` },
            { label: "MtYearPicker", url: `${BASE}/year-picker` },
            { label: "MtYearPickerInput", url: `${BASE}/year-picker-input` },
            { label: "MtYearRangePicker", url: `${BASE}/year-range-picker` },
            { label: "MtYearRangePickerInput", url: `${BASE}/year-range-picker-input` },
          ],
          documentationUrl: `${BASE}/#date-and-time`,
          icon: "RepeaterIcon"
        },
        {
          name: "Layout",
          chips: [
            { label: "MtContainer", url: `${BASE}/container` },
          ],
          documentationUrl: `${BASE}/#layout`,
          icon: "ContainerIcon"
        },
        {
          name: "Typography",
          chips: [
            { label: "MtText", url: `${BASE}/text` },
            { label: "MtTitle", url: `${BASE}/title` },
            { label: "MtTypography", url: `${BASE}/typography` },
          ],
          documentationUrl: `${BASE}/#typography`,
          icon: "DataGridIcon"
        },
        {
          name: "Miscellaneous",
          chips: [
            { label: "MtDivider", url: `${BASE}/divider` },
            { label: "MtErrorWrapper", url: `${BASE}/error-wrapper` },
            { label: "MtViewerWrapper", url: `${BASE}/#miscellaneous` },
          ],
          documentationUrl: `${BASE}/#miscellaneous`,
          icon: "RepeaterIcon"
        },
        {
          name: "Other extensions",
          chips: [
            { label: "MtTiptap", url: `${BASE}/tiptap` },
            { label: "MtDropzone", url: `${BASE}/dropzone` },
          ],
          documentationUrl: `${BASE}/#other-extensions`,
          icon: "RepeaterIcon"
        },
        {
          name: "Overlays",
          chips: [
            { label: "MtTooltip", url: `${BASE}/tooltip` },
          ],
          documentationUrl: `${BASE}/#overlays`,
          icon: "RepeaterIcon"
        },
        {
          name: "Modal",
          chips: [
            { label: "MtDialog", url: `${BASE}/dialog` },
          ],
          documentationUrl: `${BASE}/#modal`,
          icon: "ContainerIcon"
        },
        {
          name: "Buttons",
          chips: [
            { label: "MtButton", url: `${BASE}/button` },
          ],
          documentationUrl: `${BASE}/#buttons`,
          icon: "ContainerIcon"
        },
      ]}
    />
  );
};

export default MantineComponentsListBlock;
