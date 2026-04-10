'use client';

import Pricing from '@/components/pricing/Pricing';
import LogosBlock from '@/components/LogosBlock';
import FAQBlock from '@/components/FAQBlock';
import CustomerTestimonialsBlock from '@/components/CustomerTestimonialsBlock';
import ContactCTABlock from '@/components/ContactCTABlock';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ComponentsTableBlock } from '@/components/ComponentsTableBlock';
import WorkflowEngineComponentsBlock from '@/components/WorkflowEngineComponentsBlock';
import pricingFaq from '@/data/pricing-faq.json';

export default function PricingPage() {
  return (
    <div>
      <section className="py-16 px-4 sm:px-8 pb-0">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-white mb-4">
            WorkflowEngine Pricing
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Flexible pricing options for every project size. From free open-source to enterprise solutions with premium features and support.
          </p>
        </div>
      </section>

      <Pricing />

      <div className="h-16"></div>

      <ComponentsTableBlock showHeader={true} showFooter={true} />

      <div className="h-8"></div>

      <WorkflowEngineComponentsBlock
        title="Components that are already available within WorkflowEngine"
        components={[
          {
            name: "Container",
            description: "The Container component represents a div tag that wraps other components, providing a way to group and organize content.",
            documentationUrl: "https://workflowengine.io/documentation/components-library/structure-components/container",
            icon: "ContainerIcon"
          },
          {
            name: "Repeater",
            description: "The Repeater component is a special component that is responsible for displaying an array of repeating components.",
            documentationUrl: "https://workflowengine.io/documentation/components-library/structure-components/repeater",
            icon: "RepeaterIcon"
          }
        ]}
      />

      <div className="h-8"></div>

      <WorkflowEngineComponentsBlock
        title="Standalone Component Package Compatible with WorkflowEngine, available under a commercial license"
        components={[
          {
            name: "QR Code",
            description: "Generates a QR code from dynamic or static text input",
            documentationUrl: "https://workflowengine.io/documentation/components-library/static-components/qr-code",
            icon: "QrCodeIcon",
            npmCommand: "npm install @react-form-builder/components-fast-qr"
          },
          {
            name: "Google Map",
            description: "Embeds an interactive Google Map with pin and location support",
            documentationUrl: "https://workflowengine.io/documentation/components-library/fields-components/google-map",
            icon: "GoogleMapIcon",
            npmCommand: "npm install @react-form-builder/components-google-map"
          },
          {
            name: "Rich Text Editor",
            description: "RichTextEditor is a thin wrapper around the rich text editor Quill.",
            documentationUrl: "https://workflowengine.io/documentation/components-library/fields-components/rich-text-editor",
            icon: "RichTextEditorIcon",
            npmCommand: "npm install @react-form-builder/components-rich-text"
          },
          {
            name: "Signature",
            description: "The Signature component is a digital signature field that enables users to create and capture handwritten signatures digitally.",
            documentationUrl: "https://workflowengine.io/documentation/components-library/fields-components/signature",
            icon: "SignatureIcon",
            npmCommand: "npm install @react-form-builder/components-signature"
          },
          {
            name: "Data Grid",
            description: "A versatile table component for displaying, sorting, filtering, and editing tabular data.",
            documentationUrl: "/react-form-components-library/data-grid/",
            icon: "DataGridIcon"
          }
        ]}
      />

      <div className="h-8"></div>

      <ComparisonTable />

      <div className="h-16"></div>

      <FAQBlock
        title="Pricing FAQ"
        faqItems={pricingFaq}
        anchor="faq"
        blockBg="rgba(31, 41, 55, 0.5)"
      />

      <div className="h-16"></div>

      <LogosBlock />

      <div className="h-16"></div>

      <CustomerTestimonialsBlock
        title="What people say"
        subtitle="Testimonials"
        testimonials={[
          {
            text: "OptimaJet's FormBuilder has been a game-changer for our form creation process. Our end users are delighted with the ability to customize the form's layout and structure without any coding knowledge.",
            name: "Samantha Lee",
            title: "Staff Software Engineer",
            company: "DCL Software"
          },
          {
            text: "We've been able to produce forms two times faster than we were before FormBuilder. Adding FormBuilder to the scope was definitely the right thing for us.",
            name: "Milovan Popovic",
            title: "Enterprise Applications Manager",
            company: "CP AdaBytes d.o.o"
          },
          {
            text: "FormBuilder has empowered us to create a truly tailored and seamless form-building experience. The best part? You can easily tweak and customize them to match our exact needs.",
            name: "Oliver Garcia",
            title: "CTO",
            company: "ERP Groupe"
          }
        ]}
        blockBg="transparent"
      />

      <div className="h-16"></div>

      <ContactCTABlock />

      <div className="h-16"></div>
    </div>
  );
}
