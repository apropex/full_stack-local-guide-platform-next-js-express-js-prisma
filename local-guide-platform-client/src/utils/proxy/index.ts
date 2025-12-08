import { tRole } from "@/constants";

export interface RouteConfig {
  exact: string[];
  patterns: RegExp[];
}

export const authRoutes: RouteConfig = {
  exact: ["/login", "/register"],
  patterns: [/^\/forgot-password(\/|$)/],
};

export const commonRoutes: RouteConfig = {
  exact: ["/my-profile"],
  patterns: [/^\/settings(\/|$)/],
};

export const guideRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard\/guide(\/|$)/],
};

export const adminRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard\/admin(\/|$)/],
};

export const touristRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard\/tourist(\/|$)/],
};

export const isValidRoute = (
  routes: RouteConfig,
  pathname: string,
): boolean => {
  const exact = routes.exact.includes(pathname);
  const pattern = routes.patterns.some((regex) => regex.test(pathname));
  return exact || pattern || false;
};

export const isAuthRoute = (pathname: string): boolean => {
  return isValidRoute(authRoutes, pathname);
};

export const getRouteOwner = (pathname: string): tRole | "COMMON" | null => {
  if (isValidRoute(adminRoutes, pathname)) return "ADMIN";
  if (isValidRoute(touristRoutes, pathname)) return "TOURIST";
  if (isValidRoute(guideRoutes, pathname)) return "GUIDE";
  if (isValidRoute(commonRoutes, pathname)) return "COMMON";
  return null;
};

export const getDefaultDashboardRoute = (role: tRole): string => {
  if (role === "ADMIN") return "/dashboard/admin";
  if (role === "SUPER_ADMIN") return "/dashboard/admin";
  if (role === "GUIDE") return "/dashboard/guide";
  if (role === "TOURIST") return "/dashboard/tourist";

  return "/";
};

export const isValidRedirectPath = (path: string, role: tRole): boolean => {
  const routeOwner = getRouteOwner(path);
  if (routeOwner === null || routeOwner === "COMMON") return true;
  return routeOwner === role || false;
};
