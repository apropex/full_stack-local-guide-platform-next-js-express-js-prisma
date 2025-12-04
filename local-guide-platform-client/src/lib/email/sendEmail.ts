/* eslint-disable @typescript-eslint/no-explicit-any */

import path from "path";
import { Resend } from "resend";
import "server-only";
import { fileURLToPath } from "url";
import { ENV } from "../config/env";
import { AppError } from "../errors/AppError";

// ESM - __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Template map: templateName → React Component
const templates = {
  verify_otp: path.resolve(__dirname, "templates/verify_otp.tsx"),
  tour_invoice: path.resolve(__dirname, "templates/tour_invoice.tsx"),
  passwordReset: path.resolve(__dirname, "templates/passwordReset.tsx"),
} as const;

type TemplateName = keyof typeof templates;

interface SendEmailParams {
  to: string | string[];
  subject: string;
  templateName: TemplateName;
  templateData: Record<string, any>;
}

const resend = new Resend(ENV.RESEND.API_KEY);

export const sendEmail = async ({ to, subject, templateName, templateData }: SendEmailParams): Promise<void> => {
  try {
    // Dynamic import template
    const templatePath = templates[templateName];
    if (!templatePath) {
      throw new AppError(400, `Template ${templateName} not found`);
    }

    const { default: TemplateComponent } = await import(templatePath);

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
    throw error instanceof AppError ? error : new AppError(500, "Email sending failed");
  }
};
