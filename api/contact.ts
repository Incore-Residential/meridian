import type { IncomingMessage, ServerResponse } from "http";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  interest: z.string().min(1),
  message: z.string().min(1),
  receiveInfo: z.boolean(),
});

export default async function handler(req: IncomingMessage & { body: unknown }, res: ServerResponse & { status: (code: number) => any; json: (data: unknown) => void }) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method not allowed" } });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: { message: "Invalid request body", code: "VALIDATION_ERROR" } });
  }

  const { fullName, email, phone, interest, message, receiveInfo } = parsed.data;

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return res
      .status(500)
      .json({ error: { message: "Email service is not configured", code: "EMAIL_NOT_CONFIGURED" } });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@liveatthemeridian.com";
  const toEmails = ["mlich@incoreresidential.com", "areyes@incoreresidential.com"];

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

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmails,
    subject: `New Contact Form Submission - ${fullName}`,
    html,
  });

  if (error) {
    console.error("Resend error:", JSON.stringify(error));
    return res
      .status(500)
      .json({ error: { message: "Failed to send email", code: "EMAIL_SEND_FAILED" } });
  }

  return res.status(200).json({ data: { success: true } });
}
