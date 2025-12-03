import catchAsync from "../../../shared/catchAsync";
import _response from "../../../shared/sendResponse";
import { checkString } from "../../../utils/checkString";
import * as bookingServices from "./booking.service";

//
export const createBooking = catchAsync(async (req, res) => {
  const tourId = checkString(
    req.params.tourId,
    "Tour id not found in the params",
  );

  const { data, options } = await bookingServices.createBooking(
    req.decoded ?? {},
    tourId,
  );

  _response(res, {
    message: "Booking created successfully",
    data,
    meta: { options },
  });
});

//
export const getAllBookings = catchAsync(async (req, res) => {
  const { data, meta } = await bookingServices.getAllBookings(req.query);

  _response(res, {
    message: "All bookings retrieved successfully!",
    data,
    meta,
  });
});

//
export const getMyBookings = catchAsync(async (req, res) => {
  req.query.userId = checkString(
    req.decoded?.id,
    "User id not found, login again",
  );

  const { data, meta } = await bookingServices.getAllBookings(req.query);

  _response(res, {
    message: "User bookings retrieved successfully!",
    data,
    meta,
  });
});

//
export const updateBookingStatus = catchAsync(async (req, res) => {
  const result = await bookingServices.updateBookingStatus(
    req.params.id,
    req.body,
  );

  _response(res, {
    message: "Booking status updated successfully!",
    data: result,
  });
});

//
export const getBookingById = catchAsync(async (req, res) => {
  const result = await bookingServices.getBookingById(req.params.id);

  _response(res, {
    message: "Booking retrieved successfully!",
    data: result,
  });
});
