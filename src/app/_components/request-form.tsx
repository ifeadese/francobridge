"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

// Request information. Each field is a box of the pale blue held by a
// hairline in the brand blue, like the blue program card. There is no
// mail service wired yet, so submitting composes an email in the visitor's
// mail app with the form's contents.
export function RequestForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const interest = String(data.get("interest") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Information request: ${interest || "FrancoBridge"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInterested in: ${interest}\n\n${message}\n`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col">
      <input name="name" required autoComplete="name" placeholder="Name" aria-label="Name" className="field mb-8" />
      <input name="email" type="email" required autoComplete="email" placeholder="Email" aria-label="Email" className="field mb-8" />
      <select name="interest" defaultValue="" aria-label="Program" className="field mb-8">
        <option value="" disabled>
          I’m interested in
        </option>
        {SERVICES.map((s) => (
          <option key={s.slug} value={s.name}>
            {s.name}
          </option>
        ))}
        <option value="Not sure yet">Not sure yet</option>
      </select>
      <textarea name="message" rows={4} required placeholder="Where are you heading?" aria-label="Message" className="field mb-10" />
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="button-primary">
          Send message
        </button>
        {sent && <p className="regular-m text-navy/70">Your mail app should open with the request ready to send.</p>}
      </div>
    </form>
  );
}

export default RequestForm;
