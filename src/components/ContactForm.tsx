"use client";

import "@/styles/contacts.css";

const ContactForm = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-semibold text-white mb-4 leading-snug">
          Contact us
        </h1>
        <h3 className="text-lg sm:text-xl text-blue-300 font-subtitle font-semibold">
          Drop us a line and we will get back to you within 24 hours to answer your questions. All submitted information will be kept confidential.
        </h3>
      </div>
      <div id="fe-contact-form" className="min-h-[600px] rounded-xl p-6 flex items-center justify-center">
        <p className="text-gray-400">Contact form placeholder — coming soon</p>
      </div>
    </div>
  );
};

export default ContactForm;
