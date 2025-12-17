/* eslint-disable @typescript-eslint/no-explicit-any */

export interface AppErrorOptions {
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
  isOperational?: boolean;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly context?: Record<string, any>;
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    {
      code = "INTERNAL_ERROR",
      context,
      isOperational = true,
    }: AppErrorOptions = {},
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.context = context;
    this.isOperational = isOperational;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
