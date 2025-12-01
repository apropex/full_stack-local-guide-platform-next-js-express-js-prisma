import { iUserSearchQuery } from "../../../shared/global-query-interfaces";

//* PATIENT CONSTANTS *\\
type iUser = (keyof iUserSearchQuery)[];

export const userFilterFields: iUser = [
  "id",
  "gender",
  "role",
  "status",
  "isVerified",
  "isDeleted",
];
export const userSearchFields: iUser = [
  "name",
  "email",
  "phone",
  "bio",
  "address",
  "language",
  "country",
  "nationality",
];
export const userBooleanFields: iUser = ["isVerified", "isDeleted"];
