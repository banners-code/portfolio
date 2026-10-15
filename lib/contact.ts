/** Contact form rules, shared by the browser (instant feedback) and the server action (authoritative). */

export type ContactField = "name" | "email" | "subject" | "message";
export type ContactInput = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; errors: ContactErrors }
  | { ok: false; reason: "unconfigured" | "rate-limited" | "rejected" | "failed"; message: string };

export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactField(field: ContactField, rawValue: string): string | undefined {
  const value = rawValue.trim();
  switch (field) {
    case "name":
      if (value.length < contactLimits.name.min) return "Please enter your name.";
      if (value.length > contactLimits.name.max) return `Please keep your name under ${contactLimits.name.max} characters.`;
      return undefined;
    case "email":
      if (!value) return "Please enter your email address so I can reply.";
      if (value.length > contactLimits.email.max || !EMAIL_PATTERN.test(value))
        return "Please enter a valid email address, like name@example.com.";
      return undefined;
    case "subject":
      if (value.length < contactLimits.subject.min) return "Please add a short subject.";
      if (value.length > contactLimits.subject.max) return `Please keep the subject under ${contactLimits.subject.max} characters.`;
      return undefined;
    case "message":
      if (value.length < contactLimits.message.min)
        return `Please write a little more — at least ${contactLimits.message.min} characters.`;
      if (value.length > contactLimits.message.max)
        return `Please keep your message under ${contactLimits.message.max} characters.`;
      return undefined;
  }
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of ["name", "email", "subject", "message"] as const) {
    const error = validateContactField(field, input[field] ?? "");
    if (error) errors[field] = error;
  }
  return errors;
}

/** A mailto: link carrying the visitor's message, used when online delivery isn't configured. */
export function buildMailto(to: string, input: ContactInput): string {
  const body = `${input.message.trim()}\n\n— ${input.name.trim()} (${input.email.trim()})`;
  return `mailto:${to}?subject=${encodeURIComponent(input.subject.trim())}&body=${encodeURIComponent(body)}`;
}
