import { iTourSearchQuery } from "../../../shared/global-query-interfaces";

type iTour = (keyof iTourSearchQuery)[];

export const tourFilterFields: iTour = [
  "id",
  "highlights",
  "price",
  "duration",
  "durationType",
  "latitude",
  "longitude",
  "maxGroupSize",
  "tags",
  "languages",
  "difficulty",
  "includes",
  "excludes",
  "whatToBring",
  "cancellationPolicy",
  "approveStatus",
  "isActive",
  "isDeleted",
  "deletedBy",
  "rating",
  "totalReviews",
];
export const tourSearchFields: iTour = [
  "title",
  "description",
  "location",
  "meetingPoint",
  "category",
];
export const tourBooleanFields: iTour = ["isActive", "isDeleted"];
export const tourNumberFields: iTour = [
  "price",
  "duration",
  "latitude",
  "longitude",
  "maxGroupSize",
  "rating",
  "totalReviews",
];
