/**
 * Server-side email delivery for the contact form, via Resend's HTTP API (no SDK needed).
 * Only imported by server code; the API key never reaches the browser.
 */

import type { ContactInput } from "./contact";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";

function deliveryEnv() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim() || null,
    to: process.env.CONTACT_TO_EMAIL?.trim() || null,
    from: process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM,
  };
}

export function isContactDeliveryConfigured(): boolean {
  const { apiKey, to } = deliveryEnv();
  return Boolean(apiKey && to);
}

/** Sends the message. Resolves true only when Resend accepted it. */
export async function deliverContactMessage(input: ContactInput): Promise<boolean> {
  const { apiKey, to, from } = deliveryEnv();
  if (!apiKey || !to) return false;

  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    "",
    input.message,
  ].join("\n");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `Portfolio enquiry: ${input.subject}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) {
      // Log the status only — never the message contents or the key.
      console.error(`[contact] Resend responded with HTTP ${response.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] Delivery request failed:", error instanceof Error ? error.name : "unknown error");
    return false;
  }
}
