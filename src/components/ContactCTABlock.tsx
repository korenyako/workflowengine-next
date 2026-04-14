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
  blockBg = "#101828"
}) => {
  return (
    <section className="py-8 lg:py-16 px-4 sm:px-8" style={{ backgroundColor: '#101828' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Левая часть - иконка и текст */}
          <div className="flex items-start gap-4">
            {/* Иконка чата */}
            <div className="flex-shrink-0 mt-1">
              <ChatIcon className="text-slate-900 w-12 h-12" />
            </div>
            
            {/* Текст */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {title}
              </h2>
              <p className="text-slate-900 text-lg mt-2">
                {description}
              </p>
            </div>
          </div>
          
          {/* Правая часть - кнопка */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <Button 
              href={buttonHref && buttonHref.startsWith('/') && buttonHref !== '/' && !buttonHref.includes('#') && !buttonHref.includes('?') && !buttonHref.endsWith('/') ? buttonHref + '/' : buttonHref} 
              variant="primary" 
              size="lg"
              className="w-full lg:w-auto"
              target={buttonHref?.startsWith('http') && !buttonHref?.startsWith('https://workflowengine.io/') ? '_blank' : '_self'}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTABlock; 
