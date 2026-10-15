"use server";

import { headers } from "next/headers";
import { validateContact, type ContactInput, type ContactResult } from "@/lib/contact";
import { deliverContactMessage, isContactDeliveryConfigured } from "@/lib/contact-delivery";

type Submission = ContactInput & {
  /** Honeypot: hidden from people, often filled in by bots. */
  company?: string;
  /** When the form was first rendered (ms since epoch), to catch instant bot submissions. */
  startedAt?: number;
};

const MIN_FILL_TIME_MS = 2500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort, per-instance rate limit. Serverless hosts may run several instances; that's acceptable here.
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (timestamps.length >= MAX_PER_WINDOW) {
    recentSubmissions.set(key, timestamps);
    return true;
  }
  timestamps.push(now);
  recentSubmissions.set(key, timestamps);
  if (recentSubmissions.size > 5000) recentSubmissions.clear();
  return false;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function sendContactMessage(submission: Submission): Promise<ContactResult> {
  const input: ContactInput = {
    name: asString(submission.name).trim(),
    email: asString(submission.email).trim(),
    subject: asString(submission.subject).trim(),
    message: asString(submission.message).trim(),
  };

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) return { ok: false, reason: "invalid", errors };

  if (asString(submission.company).length > 0) {
    return { ok: false, reason: "rejected", message: "Your message couldn't be sent. Please try again." };
  }
  if (typeof submission.startedAt === "number" && Date.now() - submission.startedAt < MIN_FILL_TIME_MS) {
    return { ok: false, reason: "rejected", message: "That was quick! Please take a moment and send it again." };
  }

  if (!isContactDeliveryConfigured()) {
    return {
      ok: false,
      reason: "unconfigured",
      message: "Online delivery isn't set up yet, so your message hasn't been sent.",
    };
  }

  const requestHeaders = await headers();
  const clientKey = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  if (isRateLimited(clientKey)) {
    return {
      ok: false,
      reason: "rate-limited",
      message: "You've sent several messages in a short time. Please wait a few minutes and try again.",
    };
  }

  const delivered = await deliverContactMessage(input);
  if (!delivered) {
    return {
      ok: false,
      reason: "failed",
      message: "Something went wrong while sending your message, and it wasn't delivered. Please try again later.",
    };
  }
  return { ok: true };
}
