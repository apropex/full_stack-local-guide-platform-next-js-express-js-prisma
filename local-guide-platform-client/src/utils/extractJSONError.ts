import { iResponse } from "@/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function extractJSONError(
  input: unknown,
): Promise<iResponse<null>> {
  const errorStr =
    typeof input === "string"
      ? input
      : (input as any)?.message ||
        (input as any)?.toString?.() ||
        JSON.stringify(input);

  const match = errorStr.match(/({[\s\S]*})/);
  if (!match)
    return {
      success: false,
      message: input as string,
      data: null,
    };

  try {
    const json = JSON.parse(match[1]);
    return {
      success: json.success ?? false,
      message: json.message,
      data: null,
    };
  } catch {
    return {
      success: false,
      message: input as string,
      data: null,
    };
  }
}
