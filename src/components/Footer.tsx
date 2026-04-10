'use client';

import React from "react";
import FooterBlock from "./FooterBlock";

const Footer: React.FC = () => {
  const footerData = {
    columns: [
      {
        title: "PRODUCTS",
        links: [
          { text: "WorkflowEngine", href: "/features/" },
          { text: "Workflow Server", href: "/server/" },
          { text: "Downloads", href: "/downloads/" },
          { text: "Pricing", href: "/pricing/" },
        ]
      },
      {
        title: "DEVELOPERS",
        links: [
          { text: "Documentation", href: "https://workflowengine.io/documentation/" },
          { text: "Release Notes", href: "https://workflowengine.io/documentation/release-notes" },
          { text: "Roadmap", href: "https://workflowengine.io/documentation/roadmap" },
          { text: "Community", href: "https://github.com/optimajet/workflowengine/discussions" },
          { text: "Blog", href: "/blog/" },
          { text: "Guides", href: "https://workflowengine.io/documentation/category/guides" },
          { text: "FAQ", href: "https://workflowengine.io/documentation/category/faq" },
          { text: "Support", href: "https://workflowengine.io/documentation/support" },
          { text: "LLMs.txt", href: "/llms.txt" }
        ]
      },
      {
        title: "RESOURCES",
        links: [
          { text: "WorkflowEngine Core MIT License", href: "https://github.com/optimajet/workflowengine/blob/master/LICENSE" },
          { text: "WorkflowEngine License", href: "https://optimajet.com/products/workflowengine/eula/" },
          { text: "Optimajet Limited", href: "https://optimajet.com/" },
          { text: "Component Source", href: "https://www.componentsource.com/product/optimajet-workflowengine/prices" },
          { text: "Resellers", href: "https://optimajet.com/resellers/" },
          { text: "For Integrators", href: "https://optimajet.com/integrators/" },
          { text: "Write for Devs", href: "https://optimajet.com/company/write-for-developers/" },
          { text: "Book a meeting", href: "https://optimajet.com/book-a-meeting/" },
          { text: "Contact Us", href: "/contacts/" }
        ]
      },
      {
        title: "COMPANY",
        links: [
          { text: "About Optimajet", href: "https://optimajet.com/" },
          { text: "Contact Us", href: "/contacts/" },
        ]
      }
    ],
    socialLinks: [
      { icon: "/icons/github.svg", href: "https://github.com/optimajet/workflowengine" },
      { icon: "/icons/youtube.svg", href: "https://www.youtube.com/@optimajet/videos" },
      { icon: "/icons/devto.svg", href: "https://dev.to/optimajet" },
      { icon: "/icons/twitter.svg", href: "https://twitter.com/OptimaJet" },
      { icon: "/icons/linkedin.svg", href: "https://hk.linkedin.com/company/optimajet" }
    ],
    logo: "/images/workflowengine-logo-white.svg",
    companyInfo: {
      logo: "/logos/optimajet.svg",
      description: "Optimajet is a software vendor that provides developer tools to help companies build workflow software applications faster, more scalably and efficiently, while reducing software development costs.",
      address: "Optimajet Limited, 14 Penn Plaza, 225 West 34th Street, New York, NY 10122",
      phone: "+1 415-683-1308",
      email: "sales@optimajet.com",
      location: ""
    }
  };

  return (
    <>
      <FooterBlock {...footerData} />
    </>
  );
};

export default Footer; 