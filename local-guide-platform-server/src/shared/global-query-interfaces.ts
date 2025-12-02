//

//* GLOBAL QUERY INTERFACES *//

export type iQuery = Record<string, unknown>;

export interface iPaginationQuery {
  page?: string;
  limit?: string;
}

export interface iSearchQuery {
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

type iPaginationAndSearchQuery = iPaginationQuery & iSearchQuery;

//* USER QUERY INTERFACE
export interface iUserSearchQuery extends iPaginationAndSearchQuery {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  bio: string;
  status: string;
  isVerified: string;
  isDeleted: string;
  address: string;
  language: string;
  country: string;
  nationality: string;
}

export interface iGuideSearchQuery extends iPaginationAndSearchQuery {
  id: string;
  userId: string;
  expertise: string;
  languages: string;
  about: string;
  experienceYears: string;
  city: string;
  country: string;
  dailyRate: string;
  hourlyRate: string;
  isVerifiedGuide: string;
  verificationDocs: string;
  dob: string;
  nid: string;
  averageRating: string;
  totalReviews: string;
}

export interface iAdminSearchQuery extends iPaginationAndSearchQuery {
  id: string;
  userId: string;
  dob: string;
  nid: string;
}
