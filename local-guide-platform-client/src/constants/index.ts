export const Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  GUIDE: "GUIDE",
  TOURIST: "TOURIST",
} as const;

export const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  BANNED: "BANNED",
} as const;

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;

export const Difficulty = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
} as const;

export const TourStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export const BookingStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
} as const;

export const PaymentStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
} as const;

export const TourDurationType = {
  HOURS: "HOURS",
  DAYS: "DAYS",
} as const;

export const otpOptions = {
  setOtp: "setOtp",
  verifyOtp: "verifyOtp",
} as const;

export const tourCategories = [
  "Adventure",
  "Food",
  "Heritage",
  "Photography",
  "Nature",
  "Cultural",
  "Wildlife",
  "Historical",
  "Beach",
  "Mountain",
  "Hiking",
  "Trekking",
  "Camping",
  "Luxury",
  "Budget",
  "City Tour",
  "Village Life",
  "Eco Tour",
  "River Cruise",
  "Boat Ride",
  "Religious",
  "Festival",
  "Wellness",
  "Night Tour",
] as const;

export type tRole = (typeof Role)[keyof typeof Role];
export type tUserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export type tGender = (typeof Gender)[keyof typeof Gender];
export type tDifficulty = (typeof Difficulty)[keyof typeof Difficulty];
export type tTourStatus = (typeof TourStatus)[keyof typeof TourStatus];
export type tBookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export type tPaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export type tTourDurationType =
  (typeof TourDurationType)[keyof typeof TourDurationType];
export type tOtpOptions = (typeof otpOptions)[keyof typeof otpOptions];
