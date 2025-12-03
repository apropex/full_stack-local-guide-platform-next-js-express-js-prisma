/* eslint-disable @typescript-eslint/no-explicit-any */

// lib/errors/handleError.ts

import { isProd } from "@/lib/config/env";
import { NextResponse } from "next/server";
import { AppError } from "./AppError";

type ErrorResponse = {
  success: false;
  message: string;
  error: {
    code: string;
    context?: Record<string, any>;
  };
  stack?: string;
};

export function handleError(err: unknown): NextResponse<ErrorResponse> {
  let statusCode = 500;
  let message = "Internal Server Error";
  let code = "INTERNAL_ERROR";
  let context: Record<string, any> | undefined;

  // 1. Custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code;
    context = err.context;
  }

  // 2. Zod Validation Error
  else if (err instanceof Error && err.name === "ZodError") {
    statusCode = 400;
    message = "Validation failed";
    code = "ZOD_VALIDATION_ERROR";
    try {
      const issues = JSON.parse(err.message);
      context = {
        issues: issues.map((i: any) => ({ path: i.path, message: i.message })),
      };
    } catch {
      context = { raw: err.message };
    }
  }

  // 3. Generic Error
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message || "Something went wrong";
    code = "UNHANDLED_ERROR";
  }

  // === LOGGING (Always in dev, conditionally in prod) ===
  if (!isProd) {
    console.error(err, { statusCode, code, path: "unknown" });
  } else {
    // In prod: log only operational errors + critical
    if (err instanceof AppError && err.isOperational) {
      console.error(err, { statusCode, code });
    } else {
      console.error(err, { statusCode, code }); // critical
    }
  }

  // === RESPONSE ===
  const response: ErrorResponse = {
    success: false,
    message,
    error: { code, ...(context && { context }) },
  };

  if (!isProd) {
    response.stack = err instanceof Error ? err.stack : undefined;
  }

  return NextResponse.json(response, { status: statusCode });
}
