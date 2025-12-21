import { BookingStatus, PaymentStatus, Prisma } from "@prisma/client";
import { Request } from "express";
import ApiError from "../../../lib/ApiError";
import prisma from "../../../lib/prisma";
import { iQuery } from "../../../shared/global-query-interfaces";
import { sCode } from "../../../utils";
import { checkString } from "../../../utils/checkString";
import configureQuery from "../../../utils/configureQuery";
import { iSSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { sslPaymentInit } from "../sslCommerz/sslCommerz.service";

interface UpdateStatusParams {
  trxId: string;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  success: boolean;
  message: string;
  // paymentInfo?: object;
}

const processPaymentStatusUpdate = async ({
  trxId,
  paymentStatus,
  bookingStatus,
  success,
  message,
}: UpdateStatusParams) => {
  // STEP-1: Update payment
  const payment = await prisma.payment.update({
    where: { trxId },
    data: { status: paymentStatus },
    include: { booking: true },
  });

  if (!payment) throw new ApiError(404, "Payment not found");
  if (!payment.booking?.id) throw new ApiError(404, "Booking not found");

  // STEP-2: Update booking
  await prisma.booking.update({
    where: { id: payment.booking.id },
    data: { status: bookingStatus },
  });

  return { success, message };
};

export const successPayment = async (trxId: string) => {
  return await processPaymentStatusUpdate({
    trxId,
    paymentStatus: PaymentStatus.SUCCESS,
    bookingStatus: BookingStatus.CONFIRMED,
    success: true,
    message: "Payment completed successfully",
  });
};

export const failPayment = async (trxId: string) => {
  return await processPaymentStatusUpdate({
    trxId,
    paymentStatus: PaymentStatus.FAILED,
    bookingStatus: BookingStatus.FAILED,
    success: false,
    message: "Payment failed",
  });
};

export const cancelPayment = async (trxId: string) => {
  return await processPaymentStatusUpdate({
    trxId,
    paymentStatus: PaymentStatus.CANCELLED,
    bookingStatus: BookingStatus.CANCELLED,
    success: false,
    message: "Payment canceled",
  });
};

// canceled

export const repayment = async (req: Request) => {
  const id = checkString(
    req.params?.bookingId,
    "Booking ID not found in the params",
  );
  const decoded = req.decoded;

  if (!decoded) throw new ApiError(sCode.UNAUTHORIZED, "Unauthorized");

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { payment: true, tour: true },
  });

  if (!booking?.payment) {
    throw new ApiError(
      sCode.NOT_FOUND,
      "Payment not found. Please book a tour",
    );
  }

  if (
    booking.status === BookingStatus.CONFIRMED &&
    booking.payment.status === PaymentStatus.SUCCESS
  ) {
    throw new ApiError(
      sCode.BAD_REQUEST,
      "You already paid the bill and booked the tour",
    );
  }

  const sslPayload = {
    amount: booking.payment.amount,
    trxId: booking.payment.trxId,
    name: decoded.name,
    email: decoded.email,
    phone: decoded.phone,
    address: decoded.address,
  } as iSSLCommerz;

  const sslPayment = await sslPaymentInit(sslPayload);

  return {
    options: { paymentURL: sslPayment?.GatewayPageURL },
    message: "SSL payment url arrived successfully",
  };
};

//
export const getInvoiceUrl = async (paymentId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    omit: { paymentInfo: true },
  });

  if (!payment) throw new ApiError(sCode.NOT_FOUND, "Payment not found");
  if (!payment.invoiceUrl)
    throw new ApiError(sCode.NOT_FOUND, "Payment not found");

  return { data: payment };
};

// ====================================================================
type WhereInput = Prisma.PaymentWhereInput;

export const myPayments = async (userId: string, query: iQuery) => {
  const { page, take, skip, orderBy } = configureQuery(query);

  const where = {} as WhereInput;
  where.AND = [];
  //   where.AND.push({ booking: { is: { userId } } });
  where.booking = { userId };

  if (query.trxId) where.AND.push({ trxId: query.trxId });
  if (query.id) where.AND.push({ id: query.id });
  if (query.amount) where.AND.push({ amount: query.amount });
  if (query.status) where.AND.push({ status: query.status });

  const include = {
    booking: true,
  };

  const [payments, total_records, filtered_records] = await Promise.all([
    prisma.payment.findMany({ where, orderBy, skip, take, include }),
    prisma.payment.count(),
    prisma.payment.count({ where }),
  ]);

  const totalAmount = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: PaymentStatus.SUCCESS },
  });

  const pendingAmount = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: PaymentStatus.PENDING },
  });

  return {
    data: payments,
    meta: {
      total_records,
      filtered_records,
      present_records: payments.length ?? 0,
      total_pages: Math.ceil(filtered_records / take),
      present_page: page,
      skip,
      limit: take,
      options: {
        totalAmount: totalAmount._sum.amount,
        pendingAmount: pendingAmount._sum.amount,
      },
    },
  };
};
