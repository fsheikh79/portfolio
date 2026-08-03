import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name should be at least 2 characters.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),
  company: z
    .string()
    .trim()
    .max(80, "Company is too long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "A little more context helps — 20+ characters, please.")
    .max(4000, "Message is too long — trim it under 4000 characters."),
  // Honeypot — real users should leave this empty.
  website: z.string().max(0, "").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export interface ContactApiSuccess {
  success: true;
  message: string;
}

export interface ContactApiFallback {
  success: false;
  reason: "not_configured";
  message: string;
}

export interface ContactApiFailure {
  success: false;
  reason: "invalid" | "send_failed" | "rate_limited" | "unknown";
  message: string;
  errors?: Record<string, string[]>;
}

export type ContactApiResponse =
  | ContactApiSuccess
  | ContactApiFallback
  | ContactApiFailure;

export function buildMailto(input: Partial<ContactInput>, to: string): string {
  const subject = `Portfolio contact from ${input.name ?? "someone"}`;
  const bodyLines = [
    `Name: ${input.name ?? ""}`,
    `Email: ${input.email ?? ""}`,
    input.company ? `Company: ${input.company}` : null,
    "",
    input.message ?? "",
  ].filter((line): line is string => line !== null);
  const body = bodyLines.join("\n");
  const params = new URLSearchParams({ subject, body });
  return `mailto:${to}?${params.toString()}`;
}
