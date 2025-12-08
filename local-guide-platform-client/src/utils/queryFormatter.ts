import { join } from ".";

export const queryFormatter = (params?: {
  [key: string]: string | string[] | undefined;
}) => {
  if (!params) return "";

  const queryArray = Object.entries(params).map(([key, value]): string => {
    if (Array.isArray(value)) {
      return value.map((v) => join(key, "=", encodeURIComponent(v))).join("&");
    } else if (value !== undefined) {
      return join(key, "=", encodeURIComponent(value));
    }
    return "";
  });

  return queryArray.filter((q) => q !== "").join("&");
};
