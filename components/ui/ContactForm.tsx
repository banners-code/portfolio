"use client";

import { useEffect, useId, useRef, useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { CircleAlert, CircleCheck, Info, LoaderCircle, Mail, Send, TriangleAlert } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";
import {
  buildMailto,
  contactLimits,
  validateContact,
  validateContactField,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/contact";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

/**
 * online  — messages are delivered by the server action (Resend configured).
 * mailto  — no delivery configured, but an email address is: the form hands the message to the visitor's email app.
 * offline — neither is configured: the form explains this and stays disabled. It never pretends to send.
 */
export type ContactMode = "online" | "mailto" | "offline";

type Status =
  | { kind: "idle" }
  | { kind: "sent" }
  | { kind: "handoff" }
  | { kind: "error"; message: string; offerFallback: boolean };

const FIELDS: ContactField[] = ["name", "email", "subject", "message"];
const EMPTY: ContactInput = { name: "", email: "", subject: "", message: "" };
const PREFILL_PREFIX = "Project enquiry: ";

const inputClasses =
  "block w-full rounded-2xl bg-ink-950/60 px-4 py-3 text-base text-fg placeholder:text-faint/80 ring-1 ring-inset ring-white/10 transition-[box-shadow,background-color] duration-200 hover:ring-white/20 focus:bg-ink-950/80 focus:ring-2 focus:ring-violet/70 focus:outline-none focus-visible:outline-none aria-[invalid=true]:ring-rose-300/70 disabled:cursor-not-allowed disabled:opacity-60";

export function ContactForm({ mode, email, githubUrl }: { mode: ContactMode; email: string | null; githubUrl: string }) {
  const formId = useId();
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(0);
  const fieldRefs = useRef<Partial<Record<ContactField, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // "Discuss your project" links in the services section pre-fill the subject (unless the visitor already wrote one).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[data-prefill]");
      const topic = link?.dataset.prefill;
      if (!topic) return;
      const currentSubject = fieldRefs.current.subject?.value ?? "";
      if (currentSubject.trim() && !currentSubject.startsWith(PREFILL_PREFIX)) return;
      setValues((current) => ({ ...current, subject: `${PREFILL_PREFIX}${topic}` }));
      // The pre-filled subject is valid, so clear any error left from an earlier attempt.
      setErrors((current) => ({ ...current, subject: undefined }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const disabled = mode === "offline";
  const fieldId = (field: ContactField) => `${formId}-${field}`;

  const onChange = (field: ContactField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateContactField(field, value) }));
  };

  const onBlur = (field: ContactField) => () => {
    // Don't flag an untouched empty field just because focus passed through it.
    if (!touched[field] && values[field].trim() === "") return;
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateContactField(field, values[field]) }));
  };

  const focusFirstInvalid = (nextErrors: ContactErrors) => {
    const first = FIELDS.find((field) => nextErrors[field]);
    if (first) fieldRefs.current[first]?.focus();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending || disabled) return;

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ kind: "error", message: "Please check the highlighted fields.", offerFallback: false });
      focusFirstInvalid(nextErrors);
      return;
    }

    if (mode === "mailto" && email) {
      window.location.href = buildMailto(email, values);
      setStatus({ kind: "handoff" });
      return;
    }

    setStatus({ kind: "idle" });
    startTransition(async () => {
      try {
        const result = await sendContactMessage({ ...values, company, startedAt: startedAt.current });
        if (result.ok) {
          setValues(EMPTY);
          setTouched({});
          setErrors({});
          setStatus({ kind: "sent" });
        } else if (result.reason === "invalid") {
          setErrors(result.errors);
          setStatus({ kind: "error", message: "Please check the highlighted fields.", offerFallback: false });
          focusFirstInvalid(result.errors);
        } else {
          setStatus({ kind: "error", message: result.message, offerFallback: true });
        }
      } catch {
        setStatus({
          kind: "error",
          message: "Your message couldn't be sent — the connection to the server failed. Please check your connection and try again.",
          offerFallback: true,
        });
      }
    });
  };

  const describedBy = (field: ContactField, hint?: boolean) =>
    [hint ? `${fieldId(field)}-hint` : null, errors[field] ? `${fieldId(field)}-error` : null].filter(Boolean).join(" ") ||
    undefined;

  const renderError = (field: ContactField) =>
    errors[field] ? (
      <p id={`${fieldId(field)}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-rose-300">
        <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {errors[field]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${formId}-mode`} className="relative flex flex-col gap-5">
      <ModeNotice id={`${formId}-mode`} mode={mode} email={email} githubUrl={githubUrl} />

      <fieldset disabled={disabled} className="contents">
        <legend className="sr-only">Your message</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={fieldId("name")} className="mb-2 block text-sm font-medium text-fg">
              Name
            </label>
            <input
              ref={(element) => {
                fieldRefs.current.name = element;
              }}
              id={fieldId("name")}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              maxLength={contactLimits.name.max}
              value={values.name}
              onChange={onChange("name")}
              onBlur={onBlur("name")}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy("name")}
              className={inputClasses}
            />
            {renderError("name")}
          </div>
          <div>
            <label htmlFor={fieldId("email")} className="mb-2 block text-sm font-medium text-fg">
              Email
            </label>
            <input
              ref={(element) => {
                fieldRefs.current.email = element;
              }}
              id={fieldId("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              maxLength={contactLimits.email.max}
              value={values.email}
              onChange={onChange("email")}
              onBlur={onBlur("email")}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
              className={inputClasses}
            />
            {renderError("email")}
          </div>
        </div>

        <div>
          <label htmlFor={fieldId("subject")} className="mb-2 block text-sm font-medium text-fg">
            Subject
          </label>
          <input
            ref={(element) => {
              fieldRefs.current.subject = element;
            }}
            id={fieldId("subject")}
            name="subject"
            type="text"
            placeholder="What would you like to talk about?"
            maxLength={contactLimits.subject.max}
            value={values.subject}
            onChange={onChange("subject")}
            onBlur={onBlur("subject")}
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={describedBy("subject")}
            className={inputClasses}
          />
          {renderError("subject")}
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <label htmlFor={fieldId("message")} className="block text-sm font-medium text-fg">
              Message
            </label>
            <span aria-hidden="true" className="font-mono text-xs text-faint">
              {values.message.trim().length}/{contactLimits.message.max}
            </span>
          </div>
          <textarea
            ref={(element) => {
              fieldRefs.current.message = element;
            }}
            id={fieldId("message")}
            name="message"
            rows={6}
            placeholder="Tell me about your project, role or idea."
            maxLength={contactLimits.message.max}
            value={values.message}
            onChange={onChange("message")}
            onBlur={onBlur("message")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message", true)}
            className={cn(inputClasses, "min-h-40 resize-y")}
          />
          <p id={`${fieldId("message")}-hint`} className="mt-2 text-xs text-faint">
            At least {contactLimits.message.min} characters.
          </p>
          {renderError("message")}
        </div>

        {/* Honeypot — invisible to people and assistive technology. */}
        <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor={`${formId}-company`}>Company (leave this empty)</label>
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" disabled={pending || disabled} aria-disabled={pending || disabled}>
            {pending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : mode === "mailto" ? (
              <>
                <Mail className="size-4" aria-hidden="true" />
                Continue in email app
              </>
            ) : (
              <>
                <Send className="size-4" aria-hidden="true" />
                Send message
              </>
            )}
          </Button>
          {mode === "online" ? (
            <p className="text-xs text-faint">Your details are only used to reply to you.</p>
          ) : null}
        </div>
      </fieldset>

      <div aria-live="polite" aria-atomic="true">
        {status.kind === "sent" ? (
          <p className="flex items-start gap-3 rounded-2xl bg-emerald-300/[0.07] p-4 text-sm leading-relaxed text-emerald-100 ring-1 ring-emerald-300/20 ring-inset">
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
            <span>
              <strong className="font-medium">Message sent.</strong> Thank you for reaching out — I&apos;ll reply to the email
              address you provided.
            </span>
          </p>
        ) : null}
        {status.kind === "handoff" && email ? (
          <p className="flex items-start gap-3 rounded-2xl bg-blue/[0.07] p-4 text-sm leading-relaxed text-blue-100 ring-1 ring-blue/20 ring-inset">
            <Info className="mt-0.5 size-4 shrink-0 text-blue-soft" aria-hidden="true" />
            <span>
              Your email app should now be open with the message ready — it isn&apos;t sent until you press send there. If
              nothing opened, email me at{" "}
              <a href={buildMailto(email, values)} className="font-medium text-fg underline underline-offset-4">
                {email}
              </a>
              .
            </span>
          </p>
        ) : null}
        {status.kind === "error" ? (
          <div className="flex items-start gap-3 rounded-2xl bg-rose-300/[0.07] p-4 text-sm leading-relaxed text-rose-100 ring-1 ring-rose-300/20 ring-inset">
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-rose-300" aria-hidden="true" />
            <div>
              <p>{status.message}</p>
              {status.offerFallback ? (
                <p className="mt-1.5 text-rose-100/80">
                  {email ? (
                    <>
                      You can also{" "}
                      <a href={buildMailto(email, values)} className="font-medium text-fg underline underline-offset-4">
                        email me directly
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      You can also reach me on{" "}
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-fg underline underline-offset-4"
                      >
                        GitHub<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      .
                    </>
                  )}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}

function ModeNotice({ id, mode, email, githubUrl }: { id: string; mode: ContactMode; email: string | null; githubUrl: string }) {
  const showSetupHint = process.env.NODE_ENV === "development" && mode !== "online";

  return (
    <div id={id} className="flex flex-col gap-3 empty:hidden">
      {mode === "mailto" && email ? (
        <p className="flex items-start gap-3 rounded-2xl bg-blue/[0.06] p-4 text-sm leading-relaxed text-blue-100/90 ring-1 ring-blue/15 ring-inset">
          <Info className="mt-0.5 size-4 shrink-0 text-blue-soft" aria-hidden="true" />
          <span>
            Online delivery isn&apos;t switched on yet. When you continue, your email app opens with this message ready to send
            to <span className="text-fg">{email}</span> — nothing is sent from this page.
          </span>
        </p>
      ) : null}
      {mode === "offline" ? (
        <p className="flex items-start gap-3 rounded-2xl bg-status-client/[0.06] p-4 text-sm leading-relaxed text-amber-100/90 ring-1 ring-status-client/15 ring-inset">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-status-client" aria-hidden="true" />
          <span>
            This form isn&apos;t connected to an inbox yet, so it can&apos;t send messages. Please reach me on{" "}
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-fg underline underline-offset-4">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            for now.
          </span>
        </p>
      ) : null}
      {showSetupHint ? (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 font-mono text-xs leading-relaxed text-faint">
          Setup note (shown in development only): add RESEND_API_KEY and CONTACT_TO_EMAIL to enable delivery, or set
          contact.email in lib/site-config.ts for the email-app fallback. See README → Contact form.
        </p>
      ) : null}
    </div>
  );
}
