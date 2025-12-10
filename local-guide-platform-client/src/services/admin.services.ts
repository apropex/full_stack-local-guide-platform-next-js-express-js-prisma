"use server";

import { routes } from "@/constants/routes";
import { errorResponse } from "@/helper/errorResponse";
import { iAdmin } from "@/interfaces/user.interfaces";
import { _fetch } from "@/lib/custom-fetch";
import { join } from "@/utils";
import { AdminPayload } from "@/zod/admin.schema";

export const createAdmin = async (payload: AdminPayload) => {
  const { father, fathersNid, ...rest } = payload;

  const verificationDocs = {
    father: father ?? "",
    fathersNid: fathersNid ?? "",
  };

  try {
    return await _fetch.post(routes.admin("create-admin"), {
      data: {
        ...rest,
        verificationDocs,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
};

export const updateAdmin = async (adminId: string, payload: AdminPayload) => {
  const { father, fathersNid, ...rest } = payload;

  const verificationDocs = {
    father: father ?? "",
    fathersNid: fathersNid ?? "",
  };

  try {
    return await _fetch.patch(routes.admin(adminId), {
      data: {
        ...rest,
        verificationDocs,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
};

export const getAdminById = async (adminId: string) => {
  try {
    return await _fetch.get(routes.admin(adminId));
  } catch (error) {
    return errorResponse(error);
  }
};

export const getAllAdmins = async (query?: string) => {
  try {
    const api = join(routes.admin("all"), query ? join("?", query) : "");
    return await _fetch.get<iAdmin[]>(api);
  } catch (error) {
    return errorResponse(error);
  }
};

export const verifyGuide = async (id: string) => {
  try {
    return await _fetch.patch(routes.admin("verify-guide", id));
  } catch (error) {
    return errorResponse(error);
  }
};
