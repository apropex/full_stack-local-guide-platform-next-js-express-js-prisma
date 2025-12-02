import ApiError from "../lib/ApiError";

export const checkString = (id: string | undefined, errMsg: string): string => {
  if (!id) throw new ApiError(400, errMsg);
  return id;
};
