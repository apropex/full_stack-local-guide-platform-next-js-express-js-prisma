import { tGender, tRole, tUserStatus } from "@/constants";

export interface iUser {
  id: string;
  name: string;
  email: string;
  hasPassword: boolean;
  password?: string;
  phone?: string;
  gender?: tGender;
  address?: string;
  bio?: string;
  language?: string;
  country?: string;
  nationality?: string;
  status: tUserStatus;
  isVerified: boolean;
  isDeleted: boolean;
  updatedAt: string;
  createdAt: string;
  avatar?: iUserAvatar;
  socialImageUrl?: string;
  role: tRole;
  guide?: iGuide;
  admin?: iAdmin;
}

export interface iAccount {
  id: string;
  provider: string;
  providerAccountId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  userId: string;
  user: iUser;
  createdAt: string;
}

export interface iGuide {
  id: string;
  userId: string;
  expertise: string;
  languages: string;
  about: string;
  experienceYears?: number;
  city: string;
  country: string;
  dailyRate: number;
  hourlyRate: number;
  isVerifiedGuide: boolean;
  verificationDocs: string;
  dob: string;
  nid: string;
  averageRating?: number;
  totalReviews?: number;
  createdAt: string;
  verifierId?: string;
  verifier?: iAdmin;
  user: iUser;
}

export interface iAdmin {
  id: string;
  userId: string;
  dob: string;
  nid: string;
  permissions: string;
  isVerifiedAdmin: boolean;
  verificationDocs: string;
  createdAt: string;
  user: iUser;
  verifiedGuides: iGuide[];
  verifierId?: string;
  verifier?: iAdmin;
  verifiedAdmins: iAdmin[];
}

export interface iUserAvatar {
  id: string;
  url: string;
  publicId: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  folder?: string;
  createdAt: string;
  userId: string;
  user: iUser;
}
