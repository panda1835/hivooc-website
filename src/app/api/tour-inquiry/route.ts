import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";
const TO_EMAIL = "lehoangphuc1820@gmail.com";
export const runtime = "nodejs";

type InquiryValue = string | string[];
type InquiryPayload = Record<string, InquiryValue>;

function toSingleLine(value: string): string {
  return value
    .replaceAll(/[\r\n\t]+/g, " ")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function toReadableLabel(key: string): string {
  const normalized = key
    .replaceAll(/[_-]+/g, " ")
    .replaceAll(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!normalized) {
    return "Field";
  }

  return normalized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toHtmlTableRows(fields: InquiryPayload): string {
  return Object.entries(fields)
    .map(([key, value]) => {
      const normalized = Array.isArray(value) ? value.join(", ") : value;
      return `<tr><td style=\"padding:8px;border:1px solid #ddd;font-weight:600;vertical-align:top;\">${escapeHtml(toReadableLabel(key))}</td><td style=\"padding:8px;border:1px solid #ddd;\">${escapeHtml(normalized || "-")}</td></tr>`;
    })
    .join("");
}

function toTextBody(fields: InquiryPayload): string {
  return Object.entries(fields)
    .map(([key, value]) => {
      const normalized = Array.isArray(value) ? value.join(", ") : value;
      return `${toReadableLabel(key)}: ${normalized || "-"}`;
    })
    .join("\n");
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as {
      formType?: string;
      inquiryTitle?: string;
      locale?: string;
      sourcePath?: string;
      fields?: InquiryPayload;
    };

    if (!body?.formType || !body?.fields || typeof body.fields !== "object") {
      return NextResponse.json(
        { error: "Invalid payload. formType and fields are required." },
        { status: 400 },
      );
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const resolvedTitle = toSingleLine(
      body.inquiryTitle?.trim() || `${body.formType} inquiry`,
    );
    const subject = `[HIVOOC] ${resolvedTitle}`;
    const submittedEmail = body.fields.email;
    const replyTo =
      typeof submittedEmail === "string" && submittedEmail
        ? submittedEmail
        : undefined;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
        <h2 style="margin:0 0 12px;">${escapeHtml(resolvedTitle)}</h2>
        ${body.locale ? `<p style="margin:0 0 8px;"><strong>Locale:</strong> ${escapeHtml(body.locale)}</p>` : ""}
        ${body.sourcePath ? `<p style="margin:0 0 12px;"><strong>Source Path:</strong> ${escapeHtml(body.sourcePath)}</p>` : ""}
        <table style="border-collapse:collapse;width:100%;">
          <tbody>
            ${toHtmlTableRows(body.fields)}
          </tbody>
        </table>
      </div>
    `;

    const text = `${resolvedTitle}${body.locale ? `\nLocale: ${body.locale}` : ""}${body.sourcePath ? `\nSource Path: ${body.sourcePath}` : ""}\n\n${toTextBody(body.fields)}`;

    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [TO_EMAIL],
        reply_to: replyTo,
        subject,
        html,
        text,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      return NextResponse.json(
        {
          error: "Failed to send inquiry email via Resend.",
          details: errorBody,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error.";

    return NextResponse.json(
      {
        error: "Unexpected error while sending inquiry email.",
        details: message,
      },
      { status: 500 },
    );
  }
}
