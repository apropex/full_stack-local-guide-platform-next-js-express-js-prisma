import { Role } from "@prisma/client";

const { SUPER_ADMIN, ADMIN, GUIDE, TOURIST } = Role;

export const adminAccess: Role[] = [SUPER_ADMIN, ADMIN];
export const guideAccess: Role[] = [SUPER_ADMIN, ADMIN, GUIDE];
export const touristAccess: Role[] = [SUPER_ADMIN, ADMIN, GUIDE, TOURIST];
