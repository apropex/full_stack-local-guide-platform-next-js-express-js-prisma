//
import { v4 } from "uuid";

export function join(...params: (string | number)[]): string {
  return params?.join("") ?? "";
}

export const urid = v4;

export const modifiedArray = (ary?: { value: string }[]): string[] => {
  return ary ? ary.map(({ value }) => value.trim()).filter(Boolean) : [];
};

export const stringToArray = (
  separateBy: "," | " " | "-" | "_" | "@",
  str?: string,
): string[] => {
  return str
    ? str
        .split(separateBy)
        .map((v) => v.trim())
        ?.filter(Boolean)
    : [];
};
