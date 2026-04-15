"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/backend/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await response.json().catch(() => ({ message: "Unknown error" }));

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(body.message || "Failed to send your message.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error — please try again or email sales@optimajet.com directly.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-slate-900 mb-4 leading-snug">
          Contact us
        </h1>
        <p className="text-lg text-slate-600">
          Drop us a line and we&apos;ll get back within one business day. All information stays confidential.
        </p>
      </div>

      {status === "success" ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <h2 className="text-2xl font-heading font-semibold text-emerald-900 mb-2">
            Message sent
          </h2>
          <p className="text-emerald-800">
            Thank you — our team will get back to you shortly.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field name="first_name" label="First name" required />
            <Field name="last_name" label="Last name" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field name="email" label="Work email" type="email" required />
            <Field name="business_phone" label="Phone" type="tel" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field name="company" label="Company" required />
            <Field name="job_function" label="Job title" required />
          </div>
          <Field name="details" label="How can we help?" as="textarea" rows={4} />

          {status === "error" && errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {status === "submitting" ? "Sending..." : "Send message"}
          </button>

          <p className="text-xs text-slate-500 pt-2">
            By submitting this form you agree to be contacted by OptimaJet about your request.
          </p>
        </form>
      )}
    </div>
  );
};

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
}

function Field({ name, label, type = "text", required, as = "input", rows }: FieldProps) {
  const base =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-colors";

  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {as === "textarea" ? (
        <textarea name={name} rows={rows} required={required} className={base} />
      ) : (
        <input name={name} type={type} required={required} className={base} />
      )}
    </label>
  );
}

export default ContactForm;
