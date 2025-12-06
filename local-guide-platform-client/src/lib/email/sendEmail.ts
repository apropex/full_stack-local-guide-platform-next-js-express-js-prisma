/* eslint-disable @typescript-eslint/no-explicit-any */

import { Resend } from "resend";
import "server-only";
import { ENV } from "../config/env";
import { AppError } from "../errors/AppError";

// Template map: templateName → filename (NOT absolute path)
const templates = {
  verify_otp: "verify_otp.tsx",
  tour_invoice: "tour_invoice.tsx",
  passwordReset: "passwordReset.tsx",
} as const;

type TemplateName = keyof typeof templates;

interface SendEmailParams {
  to: string | string[];
  subject: string;
  templateName: TemplateName;
  templateData: Record<string, any>;
}

const resend = new Resend(ENV.RESEND.API_KEY);

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
}: SendEmailParams): Promise<void> => {
  try {
    const filename = templates[templateName];
    if (!filename) {
      throw new AppError(400, `Template ${templateName} not found`);
    }

    // ✅ FIX: Use relative dynamic import instead of absolute path
    const { default: TemplateComponent } = await import(
      `./templates/${filename}`
    );

    const { data, error } = await resend.emails.send({
      from: ENV.RESEND.FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      react: TemplateComponent(templateData),
    });

    if (error) {
      console.error("Resend API Error", { error });
      throw new AppError(500, "Email sending failed");
    }

    console.info("Email sent successfully", {
      messageId: data?.id,
      to,
      template: templateName,
    });
  } catch (error) {
    console.error("sendEmail() failed", {
      error: error instanceof Error ? error.message : error,
      to,
      templateName,
    });
    throw error instanceof AppError
      ? error
      : new AppError(500, "Email sending failed");
  }
};
