export const joinPaths = (...parts: string[]) => {
  return (
    "/" +
    parts
      .flatMap((p) => p.split("/")) // split nested slashes
      .map((p) => p.trim())
      .filter(Boolean) // remove empty items
      .join("/")
  );
};

const createRoute = (base: string): ((...paths: string[]) => string) => {
  return (...paths: string[]): string => joinPaths(base, ...paths);
};

export const routes = {
  user: createRoute("/api/v1/user"),
  guide: createRoute("/api/v1/guide"),
  admin: createRoute("/api/v1/admin"),
  auth: createRoute("/api/v1/auth"),
  tour: createRoute("/api/v1/tour"),
  booking: createRoute("/api/v1/booking"),
  payment: createRoute("/api/v1/payment"),
} as const;

/*
export const routes = {
  user: (...url: string[]) => join("/api/v1/user", url.join("")),
  auth: (...url: string[]) => join("/api/v1/auth", url.join("")),
  tour: (...url: string[]) => join("/api/v1/tour", url.join("")),
  booking: (...url: string[]) => join("/api/v1/booking", url.join("")),
  payment: (...url: string[]) => join("/api/v1/payment", url.join("")),
} as const;
 */
