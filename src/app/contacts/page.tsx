'use client';

import ContactForm from "@/components/ContactForm";

export default function ContactsPage() {
  return (
    <div>
      <section className="pt-12 pb-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <ContactForm />
        </div>
      </section>

      <div className="h-32"></div>
    </div>
  );
}
