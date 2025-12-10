import { Prisma, Role } from "@prisma/client";
import ApiError from "../../../lib/ApiError";
import prisma from "../../../lib/prisma";
import { iQuery } from "../../../shared/global-query-interfaces";
import { sCode } from "../../../utils";
import configureQuery, {
  getSearchFilters,
} from "../../../utils/configureQuery";
import { parseValidDate } from "../../../utils/dateCustomization";
import { adminFilterFields, adminSearchFields } from "./admin.constants";

//* CREATE A NEW GUIDE *\\
export const createAdmin = async (
  userId: string,
  payload: Prisma.AdminCreateInput,
) => {
  const existingAdmin = await prisma.admin.findUnique({
    where: { userId },
  });
  if (existingAdmin) {
    throw new ApiError(sCode.CONFLICT, "Admin already exist with this email");
  }

  return await prisma.admin.create({
    data: {
      ...payload,
      user: {
        connect: { id: userId },
      },
    },
  });
};

//* UPDATE AN EXISTING GUIDE *\\
export const updateAdmin = async (
  id: string,
  payload: Prisma.AdminUpdateInput,
) => {
  const admin = await prisma.admin.findUnique({
    where: { id },
  });
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  return await prisma.admin.update({
    where: { id },
    data: payload,
  });
};

//* GET GUIDE BY ID *\\
export const getAdminById = async (id: string) => {
  const admin = await prisma.admin.findUnique({
    where: { id },
  });
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }
  return admin;
};

//* GET ALL USERS *\\
type WhereInput = Prisma.AdminWhereInput;

export const getAllAdmins = async (query: iQuery) => {
  const { page, take, skip, orderBy, search, filters } = configureQuery(query, {
    filterFields: adminFilterFields,
  });

  const { dob, ...restFilters } = filters;

  const where = getSearchFilters({
    searchFields: adminSearchFields,
    search,
    filters: restFilters,
  }) as WhereInput;

  const validDob = parseValidDate(dob as string);
  if (validDob) {
    if (!Array.isArray(where?.AND)) where.AND = [];

    where.AND.push({ dob: { gte: validDob } });
  }

  const include = {
    user: { include: { avatar: true } },
    verifier: { include: { user: true } },
  };

  const [admins, total_records, filtered_records] = await Promise.all([
    prisma.admin.findMany({ where, orderBy, skip, take, include }),
    prisma.admin.count(),
    prisma.admin.count({ where }),
  ]);

  return {
    data: admins,
    meta: {
      total_records,
      filtered_records,
      present_records: admins.length ?? 0,
      total_pages: Math.ceil(filtered_records / take),
      present_page: page,
      skip,
      limit: take,
    },
  };
};

//* VERIFY GUIDE *\\
export const verifyGuide = async (guideId: string, adminId: string) => {
  const guide = await prisma.guide.findUniqueOrThrow({
    where: { id: guideId },
    include: { user: true },
  });

  if (guide.isVerifiedGuide === true) {
    return await prisma.guide.update({
      where: { id: guide.id },
      data: { isVerifiedGuide: false },
    });
  }

  return await prisma.$transaction(async (trx) => {
    trx.user.update({
      where: { id: guide.user.id },
      data: { role: Role.GUIDE },
    });

    return await trx.guide.update({
      where: { id: guide.id },
      data: { isVerifiedGuide: true, verifierId: adminId },
    });
  });
};

//* VERIFY ADMIN *\\
export const verifyAdmin = async (rAdminId: string, adminId: string) => {
  const admin = await prisma.admin.findUniqueOrThrow({
    where: { id: rAdminId },
    include: { user: true },
  });

  if (admin.isVerifiedAdmin === true) {
    return await prisma.admin.update({
      where: { id: admin.id },
      data: { isVerifiedAdmin: false },
    });
  }

  return await prisma.$transaction(async (trx) => {
    trx.user.update({
      where: { id: admin.user.id },
      data: { role: Role.ADMIN },
    });

    return await trx.admin.update({
      where: { id: admin.id },
      data: { isVerifiedAdmin: true, verifierId: adminId },
    });
  });
};
