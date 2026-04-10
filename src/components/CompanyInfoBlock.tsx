import React from "react";

interface CompanyInfoBlockProps {
  logo: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  location: string;
  copyright: string;
}

const CompanyInfoBlock: React.FC<CompanyInfoBlockProps> = ({
  logo,
  description,
  address,
  phone,
  email,
  location,
  copyright,
}) => {
  return (
    <section className="text-white py-12 bg-transparent">
      <div className="max-w-6xl mx-auto text-center">
        {/* Логотип */}
        <div className="mb-8">
          <a 
            href="https://optimajet.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="OptimaJet" className="h-12 mx-auto" />
          </a>
        </div>
        
        {/* Описание компании */}
        <p className="text-base text-gray-300 mb-8 leading-relaxed">
          {description}
        </p>
        
        {/* Контактная информация */}
        <div className="space-y-2 mb-6">
          <p className="text-gray-300">{address}</p>
          <p className="text-gray-300">{phone}</p>
          <p className="text-gray-300">{email}</p>
        </div>
        
        {/* Локация */}
        <p className="text-gray-300 mb-8">
          {location}
        </p>
        
        {/* Copyright */}
        <p className="text-base text-gray-300 border-t border-gray-800 pt-6">
          {copyright.replace('2024', new Date().getFullYear().toString())}
        </p>
      </div>
    </section>
  );
};

export default CompanyInfoBlock; 