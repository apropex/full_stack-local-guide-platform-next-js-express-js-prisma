/* eslint-disable @typescript-eslint/no-explicit-any */
import { errorResponse } from "./errorResponse";

export const createService = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
) => {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    try {
      return await fn(...args);
    } catch (error) {
      return errorResponse(error) as any;
    }
  };
};
