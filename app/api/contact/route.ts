import { NextResponse } from "next/server";
import { contactSchema, type ContactApiResponse } from "@/lib/contact";
import { profile } from "@/lib/data";

export const runtime = "nodejs";

function json(status: number, body: ContactApiResponse) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request): Promise<NextResponse> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json(400, {
      success: false,
      reason: "invalid",
      message: "Body must be valid JSON.",
    });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(400, {
      success: false,
      reason: "invalid",
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    });
  }

  // Honeypot — silently accept and drop.
  if (parsed.data.website) {
    return json(200, {
      success: true,
      message: "Thanks — I'll be in touch.",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from = process.env.CONTACT_FROM_EMAIL || "portfolio@resend.dev";

  if (!apiKey) {
    return json(501, {
      success: false,
      reason: "not_configured",
      message:
        "Email transport isn't configured yet. Falling back to a mailto link.",
    });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: `Portfolio contact from ${parsed.data.name}`,
      text: [
        `From: ${parsed.data.name} <${parsed.data.email}>`,
        parsed.data.company ? `Company: ${parsed.data.company}` : null,
        "",
        parsed.data.message,
      ]
        .filter((line): line is string => line !== null)
        .join("\n"),
    });
    if (error) {
      return json(502, {
        success: false,
        reason: "send_failed",
        message: "Send failed. Please try email directly.",
      });
    }
    return json(200, {
      success: true,
      message: "Message sent — I'll follow up soon.",
    });
  } catch {
    return json(502, {
      success: false,
      reason: "send_failed",
      message: "Send failed. Please try email directly.",
    });
  }
}

export function GET() {
  return json(405, {
    success: false,
    reason: "invalid",
    message: "Use POST with a JSON body.",
  });
}
