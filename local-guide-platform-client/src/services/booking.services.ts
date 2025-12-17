"use server";

import { tBookingStatus } from "@/constants";
import { routes } from "@/constants/routes";
import { errorResponse } from "@/helper/errorResponse";
import { _fetch } from "@/lib/custom-fetch";
import { join } from "@/utils";
import { BookingPayload } from "@/zod/booking.schema";

export const createBooking = async (
  tourId: string,
  payload?: BookingPayload,
) => {
  try {
    return await _fetch.post(routes.booking("create", tourId), {
      data: payload,
    });
  } catch (error) {
    return errorResponse(error);
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  status: tBookingStatus,
) => {
  try {
    return await _fetch.patch(routes.booking(bookingId, "status"), {
      data: { status },
    });
  } catch (error) {
    return errorResponse(error);
  }
};

export const getBookingById = async (bookingId: string) => {
  try {
    return await _fetch.get(routes.booking(bookingId));
  } catch (error) {
    return errorResponse(error);
  }
};

export const getMyBookings = async (query?: string) => {
  try {
    const api = join(
      routes.booking("my-bookings"),
      query ? join("?", query) : "",
    );
    return await _fetch.get(api);
  } catch (error) {
    return errorResponse(error);
  }
};

export const getAllBookings = async (query?: string) => {
  try {
    const api = join(routes.booking("all"), query ? join("?", query) : "");
    return await _fetch.get(api);
  } catch (error) {
    return errorResponse(error);
  }
};
