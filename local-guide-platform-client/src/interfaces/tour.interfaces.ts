/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  tBookingStatus,
  tDifficulty,
  tPaymentStatus,
  tTourDurationType,
  tTourStatus,
} from "@/constants";
import { iImage } from ".";
import { iGuide, iUser } from "./user.interfaces";

export interface iTour {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  price: number;
  duration: number;
  durationType: tTourDurationType;
  location: string;
  latitude?: number;
  longitude?: number;
  meetingPoint: string;
  maxGroupSize: number;
  category: string;
  tags: string[];
  languages: string[];
  difficulty: tDifficulty;
  includes: string[];
  excludes: string[];
  whatToBring: string[];
  cancellationPolicy: string;
  approveStatus: tTourStatus;
  isActive: boolean;
  isDeleted: boolean;
  deletedBy?: string;
  rating: number;
  totalReviews: number;

  // Relations
  images: iImage[];
  guideId: string;
  guide: iGuide;
  createdAt: string;
  updatedAt: string;
}

export interface iBooking {
  id: string;
  userId: string;
  tourId: string;
  status: tBookingStatus;
  paymentId: string;
  payment: iPayment;
  trxId: string;
  updatedAt: string;
  createdAt: string;
  user: iUser;
  tour: iTour;
}

export interface iPayment {
  id: string;
  amount: number;
  trxId: string;
  paymentInfo: any;
  invoiceUrl: string;
  status: tPaymentStatus;
  booking: iBooking;
  createdAt: string;
}

export interface iReview {
  id: string;
  rating: number;
  comment: string;
  images: iReviewImage[];
  touristId: string;
  tourist: iUser;
  tourId: string;
  tour: iTour;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface iReviewImage {
  id: string;
  reviewId: string;
  url: string;
  publicId: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  folder?: string;
  createdAt: string;
}
