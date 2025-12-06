//

import { NextRequest, NextResponse } from "next/server";
import { tRole } from "./constants";
import { deleteCookie, getCookie } from "./helper/cookie";
import {
  checkToken,
  setAccessTokenByRefreshToken,
} from "./lib/jwt/check-token";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
} from "./utils/proxy";

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("dest", pathname);
  const redirect = (url: string) => {
    if (url === "/login") return NextResponse.redirect(loginUrl);
    return NextResponse.redirect(new URL(url, request.url));
  };

  let userRole: tRole | null = null;

  const accessToken = (await getCookie("accessToken")) || null;
  const refreshToken = (await getCookie("refreshToken")) || null;

  // 1. Check access token
  if (accessToken) {
    const decoded = await checkToken(accessToken, "access");
    if (decoded?.role) userRole = decoded.role as tRole;
    else await deleteCookie("accessToken", false);
  }

  // 2. If no valid access token, try refresh token
  if (!userRole && refreshToken) {
    const role = await setAccessTokenByRefreshToken(refreshToken);
    if (role) userRole = role;
    else return redirect("/login");
  }

  if (isAuthRoute(pathname) && userRole) {
    return redirect(getDefaultDashboardRoute(userRole));
  }

  const routeOwner = getRouteOwner(pathname);

  if (routeOwner === null) return NextResponse.next();

  if (!userRole) return redirect("/login");

  if (routeOwner === "COMMON") return NextResponse.next();

  if (pathname === "/dashboard") {
    return redirect(getDefaultDashboardRoute(userRole));
  }

  if (
    routeOwner === "ADMIN" ||
    routeOwner === "GUIDE" ||
    routeOwner === "TOURIST"
  ) {
    if (userRole !== routeOwner) {
      return redirect(getDefaultDashboardRoute(userRole));
    }
    return NextResponse.next();
  }

  return redirect("/login");
}

//
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
