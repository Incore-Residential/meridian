import type { IncomingMessage, ServerResponse } from "http";

const TO_EMAILS = ["mlich@incoreresidential.com", "areyes@incoreresidential.com"];
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "noreply@liveatthemeridian.com";

function isValidBody(body: unknown): body is {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  receiveInfo: boolean;
  recaptchaToken: string;
} {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.fullName === "string" && b.fullName.trim().length > 0 &&
    typeof b.email === "string" && b.email.includes("@") &&
    typeof b.phone === "string" && b.phone.trim().length > 0 &&
    typeof b.interest === "string" && b.interest.trim().length > 0 &&
    typeof b.message === "string" && b.message.trim().length > 0 &&
    typeof b.receiveInfo === "boolean" &&
    typeof b.recaptchaToken === "string" && b.recaptchaToken.trim().length > 0
  );
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not configured");
    return false;
  }
  const params = new URLSearchParams({ secret: secretKey, response: token });
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const data = await response.json() as { success: boolean; score?: number; action?: string };
  // v3 requires success + score >= 0.5 (0=bot, 1=human)
  if (!data.success) return false;
  if (typeof data.score === "number" && data.score < 0.5) return false;
  return true;
}

async function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => {
      try { resolve(JSON.parse(data)); }
      catch { reject(new Error("Invalid JSON")); }
    });
    req.on("error", reject);
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: { message: "Method not allowed" } }));
    return;
  }

  let body: unknown;
  try {
    body = await readBody(req);
  } catch {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: { message: "Invalid JSON body" } }));
    return;
  }

  if (!isValidBody(body)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: { message: "Invalid request body", code: "VALIDATION_ERROR" } }));
    return;
  }

  const { fullName, email, phone, interest, message, receiveInfo, recaptchaToken } = body;

  const recaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaValid) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: { message: "reCAPTCHA verification failed. Please try again.", code: "RECAPTCHA_FAILED" } }));
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    res.statusCode = 500;
    res.end(JSON.stringify({ error: { message: "Email service is not configured", code: "EMAIL_NOT_CONFIGURED" } }));
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #333;">
      <h2 style="border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 24px;">
        New Contact Form Submission
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; font-weight: bold; width: 160px; vertical-align: top;">Full Name:</td>
          <td style="padding: 10px 0;">${fullName}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Email:</td>
          <td style="padding: 10px 0;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Phone:</td>
          <td style="padding: 10px 0;">${phone}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Floor Plan Interest:</td>
          <td style="padding: 10px 0;">${interest}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Message:</td>
          <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Receive Info:</td>
          <td style="padding: 10px 0;">${receiveInfo ? "Yes" : "No"}</td>
        </tr>
      </table>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAILS,
        subject: `New Contact Form Submission - ${fullName}`,
        html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Resend API error:", JSON.stringify(errorData));
      res.statusCode = 500;
      res.end(JSON.stringify({ error: { message: "Failed to send email", code: "EMAIL_SEND_FAILED" } }));
      return;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: { message: "Failed to send email", code: "EMAIL_SEND_FAILED" } }));
    return;
  }

  res.statusCode = 200;
  res.end(JSON.stringify({ data: { success: true } }));
}
