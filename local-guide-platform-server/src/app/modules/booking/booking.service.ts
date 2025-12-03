import { Booking, BookingStatus, PaymentStatus, Prisma } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../lib/ApiError";
import prisma from "../../../lib/prisma";
import { iQuery } from "../../../shared/global-query-interfaces";
import { sCode } from "../../../utils";
import configureQuery from "../../../utils/configureQuery";
import { generateTrxID } from "../../../utils/trxIDgenerator";
import { sslPaymentInit } from "../sslCommerz/sslCommerz.service";

export const createBooking = async (decoded: JwtPayload, tourId: string) => {
  const { id, name, email, phone, address } = decoded;

  if (!id) {
    throw new ApiError(sCode.BAD_REQUEST, "User id not found, login again");
  }

  if (!phone || !address) {
    throw new ApiError(
      sCode.BAD_REQUEST,
      "Please complete your profile with phone and address",
    );
  }

  return await prisma.$transaction(async (trx) => {
    const tour = await trx.tour.findUniqueOrThrow({
      where: { id: tourId },
    });

    const payment = await trx.payment.create({
      data: {
        amount: tour.price,
        trxId: generateTrxID(),
        status: PaymentStatus.PENDING,
      },
    });

    const booking = await trx.booking.create({
      data: {
        userId: id,
        tourId,
        status: BookingStatus.PENDING,
        paymentId: payment.id,
        trxId: payment.trxId,
      },
    });

    const sslPayment = await sslPaymentInit({
      amount: payment.amount,
      trxId: payment.trxId,
      name,
      email,
      phone,
      address,
    });

    return {
      data: booking,
      options: { paymentURL: sslPayment?.GatewayPageURL },
    };
  });
};

export const updateBookingStatus = async (id: string, payload: Booking) => {
  return await prisma.booking.update({
    where: { id },
    data: { status: payload.status },
  });
};

export const getBookingById = async (id: string) => {
  return await prisma.booking.findFirstOrThrow({ where: { id } });
};

type WhereInput = Prisma.BookingWhereInput;

export const getAllBookings = async (query: iQuery) => {
  const { page, take, skip, orderBy } = configureQuery(query);

  const where = {} as WhereInput;

  where.AND = [];

  if (query.userId) where.AND.push({ userId: query.userId });
  if (query.trxId) where.AND.push({ trxId: query.trxId });
  if (query.tourId) where.AND.push({ tourId: query.tourId });
  if (query.status) where.AND.push({ status: query.status });
  if (query.paymentId) where.AND.push({ paymentId: query.paymentId });

  const include = {
    payment: true,
  };

  const [bookings, total_records, filtered_records] = await Promise.all([
    prisma.booking.findMany({ where, orderBy, skip, take, include }),
    prisma.booking.count(),
    prisma.booking.count({ where }),
  ]);

  return {
    data: bookings,
    meta: {
      total_records,
      filtered_records,
      present_records: bookings.length ?? 0,
      total_pages: Math.ceil(filtered_records / take),
      present_page: page,
      skip,
      limit: take,
    },
  };
};
