//

export function join(...params: (string | number)[]): string {
  return params?.join("") ?? "";
}
