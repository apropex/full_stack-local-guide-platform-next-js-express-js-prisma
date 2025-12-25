import { iGuideSearchQuery } from "../../../shared/global-query-interfaces";

//* PATIENT CONSTANTS *\\
type iGuide = (keyof iGuideSearchQuery)[];

export const guideFilterFields: iGuide = [
  "id",
  "userId",
  "expertise",
  "experienceYears",
  "dailyRate",
  "hourlyRate",
  "isVerifiedGuide",
  "dob",
  "totalRatings",
  "totalReviews",
];

export const guideSearchFields: iGuide = [
  "languages",
  "about",
  "city",
  "country",
  "nid",
];

export const guideBooleanFields: iGuide = ["isVerifiedGuide"];

export const guideNumberFields: iGuide = [
  "experienceYears",
  "dailyRate",
  "hourlyRate",
  "totalRatings",
  "totalReviews",
];
