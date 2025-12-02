import { iAdminSearchQuery } from "../../../shared/global-query-interfaces";

//* PATIENT CONSTANTS *\\
type iAdmin = (keyof iAdminSearchQuery)[];

export const adminFilterFields: iAdmin = ["id", "userId", "dob"];

export const adminSearchFields: iAdmin = ["nid"];
