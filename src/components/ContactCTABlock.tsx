import React from "react";
import Button from "./Button";
const ChatIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

interface ContactCTABlockProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  blockBg?: string;
}

const ContactCTABlock: React.FC<ContactCTABlockProps> = ({
  title = "Have a question?",
  description = "Ask and we'll get back with you in 1 business day.",
  buttonText = "Contact Us",
  buttonHref = "/contacts",
}) => {
  return (
    <section data-merge-footer className="pt-12 pb-[88px] lg:pt-16 lg:pb-[112px] px-6 sm:px-10 lg:px-16 bg-[#4286F4] rounded-t-[40px] lg:rounded-t-[48px] mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64 mt-6 lg:mt-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <ChatIcon className="text-white w-12 h-12" />
          </div>

          <div>
            <h2 className="text-3xl lg:text-5xl font-heading text-white">
              {title}
            </h2>
            <p className="text-lg text-white/80 mt-2">
              {description}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 w-full lg:w-auto">
          <Button
            href={buttonHref && buttonHref.startsWith('/') && buttonHref !== '/' && !buttonHref.includes('#') && !buttonHref.includes('?') && !buttonHref.endsWith('/') ? buttonHref + '/' : buttonHref}
            variant="secondary"
            size="lg"
            className="w-full lg:w-auto !border-white !text-white !bg-transparent hover:!bg-white hover:!text-[#4286F4]"
            target={buttonHref?.startsWith('http') && !buttonHref?.startsWith('https://workflowengine.io/') ? '_blank' : '_self'}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactCTABlock; 
