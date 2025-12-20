"use server";

import { routes } from "@/constants/routes";
import { errorResponse } from "@/helper/errorResponse";
import { _fetch } from "@/lib/custom-fetch";
import { join } from "@/utils";

export const repayment = async (bookingId: string) => {
  try {
    return await _fetch.post(routes.payment("repayment", bookingId));
  } catch (error) {
    return errorResponse(error);
  }
};

export const getInvoiceUrl = async (paymentId: string) => {
  try {
    return await _fetch.get(routes.payment("invoice", paymentId));
  } catch (error) {
    return errorResponse(error);
  }
};

export const myPayments = async (query?: string) => {
  try {
    const api = join(
      routes.payment("my-payments"),
      query ? join("?", query) : "",
    );
    return await _fetch.get(api);
  } catch (error) {
    return errorResponse(error);
  }
};
