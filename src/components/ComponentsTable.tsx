'use client'

const componentsData = [
  {
    component: 'AutoComplete',
    description: 'Input field that suggests options as the user types',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/autocomplete'
  },
  {
    component: 'Breadcrumb',
    description: 'Navigation trail to show page or section hierarchy',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/structure-components/breadcrumb'
  },
  {
    component: 'Button',
    description: 'Triggers actions like submit, reset, or custom logic',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/button'
  },
  {
    component: 'Calendar',
    description: 'Visual calendar view for selecting or viewing dates',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/calendar'
  },
  {
    component: 'Card',
    description: 'Box-style layout container for grouping content',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/structure-components/card'
  },
  {
    component: 'Checkbox',
    description: 'Boolean input represented by a checkable box',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/checkbox'
  },
  {
    component: 'DatePicker',
    description: 'Select a specific date from a calendar popup',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/date-picker'
  },
  {
    component: 'Divider',
    description: 'Visual separator line between form sections',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/divider'
  },
  {
    component: 'Dropdown',
    description: 'Single-choice selection from a list of predefined options',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/dropdown'
  },
  {
    component: 'Error Message',
    description: 'Displays validation or processing error messages',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/error-message'
  },
  {
    component: 'Header',
    description: 'Title or section header for grouping or emphasis',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/header'
  },
  {
    component: 'Image',
    description: 'Renders a static image with optional alt text and styling',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/image'
  },
  {
    component: 'Input',
    description: 'Standard single-line text input',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/input'
  },
  {
    component: 'Label',
    description: 'Text label attached to a field or standalone for context',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/label'
  },
  {
    component: 'Link',
    description: 'Clickable hyperlink to external/internal pages',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/link'
  },
  {
    component: 'Menu',
    description: 'Horizontal or vertical navigation menu',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/menu'
  },
  {
    component: 'Message',
    description: 'Inline notification with status (info, success, error, warning)',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/message'
  },
  {
    component: 'Number Format',
    description: 'Input field that formats numbers (e.g., currency, percentages)',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/number-format'
  },
  {
    component: 'Pattern Format',
    description: 'Used to format phone numbers, credit card numbers, and other types of numeric data',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/pattern-format'
  },
  {
    component: 'Placeholder Graph',
    description: 'Visual placeholder for future chart or graph integration',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/placeholder-graph'
  },
  {
    component: 'Placeholder Grid',
    description: 'Layout placeholder, often used in skeleton UIs',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/placeholder-grid'
  },
  {
    component: 'Placeholder Paragraph',
    description: 'Fake text block for visual placeholders or loading states',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/placeholder-paragraph'
  },
  {
    component: 'Progress Circle',
    description: 'Circular progress indicator for visualizing completion',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/progress-circle'
  },
  {
    component: 'Progress Line',
    description: 'Linear progress bar',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/progress-line'
  },
  {
    component: 'Radio Group',
    description: 'Set of mutually exclusive options (radio buttons)',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/radio-group'
  },
  {
    component: 'Search',
    description: 'Input field optimized for filtering or searching',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/search'
  },
  {
    component: 'Slot',
    description: 'Placeholder for custom React components inside the form',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/templates-components/slot'
  },
  {
    component: 'Static Content',
    description: 'Non-editable text or HTML embedded in the form',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/static-content'
  },
  {
    component: 'Tab',
    description: 'Tabbed navigation layout for form sections',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/structure-components/tab'
  },
  {
    component: 'Tag Picker',
    description: 'Multi-select input with values displayed as removable tags',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/tag-picker'
  },
  {
    component: 'Text Area',
    description: 'Multi-line text input for long content',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/text-area'
  },
  {
    component: 'TimePicker',
    description: 'UI component for selecting time values',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/time-picker'
  },
  {
    component: 'Toggle',
    description: 'On/off switch for boolean values',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/toggle'
  },
  {
    component: 'Tooltip',
    description: 'Hoverable pop-up for help or extra info',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/static-components/tooltip'
  },
  {
    component: 'Uploader',
    description: 'File upload field with progress and validation',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/fields-components/uploader'
  },
  {
    component: 'Wizard',
    description: 'Multi-step form with built-in navigation between steps',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/structure-components/wizard'
  },
  {
    component: 'Wizard Step',
    description: 'A single step within a wizard component',
    documentationUrl: 'https://workflowengine.io/documentation/components-library/structure-components/wizard-step'
  }
]

interface ComponentsTableProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

export function ComponentsTable({ showHeader = true, showFooter = true }: ComponentsTableProps) {
  return (
    <section id="react-form-component-library" className="pt-0 pb-8 px-4 sm:px-8" style={{ scrollMarginTop: '100px' }}>
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              React Form Component library
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Ready to use, MIT-licensed, and free.
            </p>
          </div>
        )}

        {/* Таблица для десктопа */}
        <div className="hidden lg:block">
          <div className="bg-white/5 rounded-lg overflow-hidden">
            {/* Заголовок таблицы */}
            <div className="grid grid-cols-3">
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-900">Component</h3>
              </div>
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-900">Description</h3>
              </div>
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-900">License</h3>
              </div>
            </div>

            {/* Строки данных */}
            {componentsData.map((row, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 ${
                  index % 2 === 0 ? 'bg-white/5' : 'bg-white/2'
                }`}
              >
                                 <div className="px-6 py-4">
                   {row.documentationUrl ? (
                     <a
                       href={row.documentationUrl}
                       className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer underline"
                     >
                       {row.component}
                     </a>
                   ) : (
                     <p className="text-slate-600">{row.component}</p>
                   )}
                 </div>
                <div className="px-6 py-4">
                  <p className="text-slate-700 text-sm">{row.description}</p>
                </div>
                <div className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700 text-sm">MIT License</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Free</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Мобильная версия */}
        <div className="lg:hidden space-y-4">
          {componentsData.map((row, index) => (
                         <div key={index} className="bg-white/5 rounded-lg p-4">
               <h3 className="text-lg mb-2">
                 {row.documentationUrl ? (
                   <a
                     href={row.documentationUrl}
                     className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer underline"
                   >
                     {row.component}
                   </a>
                 ) : (
                   <span className="text-slate-600">{row.component}</span>
                 )}
               </h3>
              <p className="text-slate-700 text-sm mb-3">{row.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-slate-700 text-sm">MIT License</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Free</span>
              </div>
            </div>
          ))}
        </div>

        {/* Футер */}
        {showFooter && (
          <div className="text-center mt-12">
            <p className="text-lg lg:text-xl mb-8 leading-normal text-slate-600 whitespace-pre-wrap break-words">
              With WorkflowEngine, you get a comprehensive package of ready-to-use components that can be easily customized to meet your specific needs.
            </p>
                         <div className="flex justify-center">
               <a 
                 href="https://workflowengine.io/documentation/components-library" 
                 className="inline-flex items-center px-8 py-4 text-lg bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 font-semibold rounded-lg hover:from-blue-400 hover:to-purple-400 transition-all duration-200"
               >
                 Documentation
               </a>
             </div>
          </div>
        )}
      </div>
    </section>
  )
} 