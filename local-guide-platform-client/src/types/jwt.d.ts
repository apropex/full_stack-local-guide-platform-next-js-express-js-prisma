import type { tGender, tRole, tUserStatus } from "../constants";

import "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    id: string;
    email: string;
    role: tRole;
    name: string;
    phone?: string;
    gender?: tGender;
    language?: string;
    country?: string;
    nationality?: string;
    status: tUserStatus;
    avatar: string;
    isVerified: boolean;
    isDeleted: boolean;
    guide?: string;
    admin?: string;
  }
}
