//
import { v4 } from "uuid";

export function join(...params: (string | number)[]): string {
  return params?.join("") ?? "";
}

export const urid = v4;
