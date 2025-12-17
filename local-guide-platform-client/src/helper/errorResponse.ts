/* eslint-disable @typescript-eslint/no-explicit-any */

import { iResponse } from "@/interfaces";
import { isProd } from "@/lib/config/env";

export const errorResponse = <T>(
  error: any,
  message?: string,
): iResponse<T> => {
  if (!isProd) {
    console.error(
      "🚨 ========================",
      error,
      "======================== 🚨",
    );
  }

  return {
    success: false,
    message: message || error.message || "Internal server error",
    data: null as T,
  };
};
