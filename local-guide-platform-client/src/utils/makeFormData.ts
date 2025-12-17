/* eslint-disable @typescript-eslint/no-explicit-any */

/*
export const makeFormData = (value: [string, any, string?, (File | File[])?]): FormData => {
  const formData = new FormData();

  formData.append(value[0], JSON.stringify(value[1] ?? ""));

  if (value[2] && value[3] && Array.isArray(value[3])) {
    value[3].forEach((file) => formData.append(value[2] as string, file));
  }

  if (value[2] && value[3] && !Array.isArray(value[3])) {
    formData.append(value[2], value[3]);
  }

  return formData;
};
*/

export const makeFormData = (
  key: string,
  value: any,
  key2?: string,
  value2?: File | File[],
): FormData => {
  const formData = new FormData();

  formData.append(key, JSON.stringify(value));

  if (key2 && value2 && Array.isArray(value2)) {
    value2.forEach((file) => formData.append(key2, file));
  }

  if (key2 && value2 && !Array.isArray(value2)) {
    formData.append(key2, value2);
  }

  return formData;
};
