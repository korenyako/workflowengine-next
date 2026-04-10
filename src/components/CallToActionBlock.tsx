import React from "react";
import Button from "./Button";

interface CallToActionBlockProps {
  title: string;
  description?: string;
  button: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  dark?: boolean;
  blockBg?: string;
}

const CallToActionBlock: React.FC<CallToActionBlockProps> = ({ 
  title, 
  description,
  button, 
  secondaryButton,
  dark = false, 
  blockBg = "#0d1117" 
}) => {
  return (
    <section 
      className="text-white py-8 lg:py-16 px-4 sm:px-8 flex justify-center"
      style={{ backgroundColor: blockBg }}
    >
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
        {description && (
          <p className="text-lg lg:text-xl mb-8 lg:mb-12 text-gray-300">{description}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href={button.href} variant="primary" size="lg" className="w-full sm:w-auto">
            {button.text}
          </Button>
          {secondaryButton && (
            <Button href={secondaryButton.href} variant="secondary" size="lg" className="w-full sm:w-auto">
              {secondaryButton.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToActionBlock; 