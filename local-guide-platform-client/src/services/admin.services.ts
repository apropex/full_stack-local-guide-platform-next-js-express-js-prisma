import { routes } from "@/constants/routes";
import { errorResponse } from "@/helper/errorResponse";
import { _fetch } from "@/lib/custom-fetch";
import { join } from "@/utils";
import { AdminPayload } from "@/zod/admin.schema";

export const createAdmin = async (payload: AdminPayload) => {
  try {
    return await _fetch.post(routes.admin(), { data: payload });
  } catch (error) {
    return errorResponse(error);
  }
};

export const updateAdmin = async (adminId: string, payload: AdminPayload) => {
  try {
    return await _fetch.patch(routes.admin(adminId), { data: payload });
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
    return await _fetch.get(api);
  } catch (error) {
    return errorResponse(error);
  }
};
