"use server";

import { routes } from "@/constants/routes";
import { errorResponse } from "@/helper/errorResponse";
import { iUser } from "@/interfaces/user.interfaces";
import { _fetch } from "@/lib/custom-fetch";
import { join } from "@/utils";
import { makeFormData } from "@/utils/makeFormData";
import { CreateUserPayload_server, UpdateUserPayload } from "@/zod/user.schema";
import { login } from "./auth.services";

export const createUser = async (
  payload: CreateUserPayload_server,
  file: File,
) => {
  try {
    delete payload.confirmPass;
    const formData = makeFormData("data", payload, "file", file);
    const result = await _fetch.post<iUser>(routes.user(), { body: formData });

    if (result.success) {
      const loginRes = await login({
        email: payload.email,
        password: payload.password,
      });

      if (loginRes.success) return loginRes;
    }

    return result;
  } catch (error) {
    return errorResponse(error);
  }
};

export const updateUser = async (
  userId: string,
  payload: UpdateUserPayload,
  file?: File,
) => {
  try {
    const formData = makeFormData("data", payload, "file", file);
    return await _fetch.patch(routes.user(userId), { body: formData });
  } catch (error) {
    return errorResponse(error);
  }
};

export const softDeleteUser = async (userId: string) => {
  try {
    return await _fetch.delete(routes.user(userId));
  } catch (error) {
    return errorResponse(error);
  }
};

export const getMe = async () => {
  try {
    return await _fetch.get(routes.user("me"));
  } catch (error) {
    return errorResponse(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    return await _fetch.get(routes.user(userId));
  } catch (error) {
    return errorResponse(error);
  }
};

export const getAllUsers = async (query?: string) => {
  try {
    const api = join(routes.user("all"), query ? join("?", query) : "");
    return await _fetch.get(api);
  } catch (error) {
    return errorResponse(error);
  }
};
