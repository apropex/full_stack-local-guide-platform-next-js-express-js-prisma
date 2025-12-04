"use server";

import { routes } from "@/constants/routes";
import { errorResponse } from "@/helper/errorResponse";
import { _fetch } from "@/lib/custom-fetch";

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
