"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

// Request information. There is no mail service wired yet, so submitting
// composes an email in the visitor's mail app with the form's contents.
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
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterested in: ${interest}\n\n${message}\n`,
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-blue focus:ring-2 focus:ring-blue/20";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-line bg-white p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate">
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm font-semibold text-slate">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block text-sm font-semibold text-slate">
        I’m interested in
        <select name="interest" className={field} defaultValue="">
          <option value="" disabled>
            Choose a programme
          </option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </label>
      <label className="block text-sm font-semibold text-slate">
        Where are you heading?
        <textarea name="message" rows={5} required className={field} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-secondary">
          Send request
        </button>
        {sent && <p className="text-sm text-slate">Your mail app should open with the request ready to send.</p>}
      </div>
    </form>
  );
}

export default RequestForm;
