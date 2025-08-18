// Next
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Utils
import { AccessControl, UserRule } from "./utils/checkRule";

const protectedRoutes = ["/dashboard"];

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((router) => pathname.startsWith(router));
}

function redirectTo(path: string, req: NextRequest) {
  return NextResponse.redirect(new URL(path, req.url));
}

function parseUserRule(access?: string): UserRule | undefined {
  if (!access) return undefined;

  try {
    let rule = decodeURIComponent(access);
    rule = rule
      .trim()
      .toLowerCase()
      .replace(/[\s\-_]+/g, "");
    rule = rule.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const routesByAccessRule: Record<string, UserRule> = {
      admin: UserRule.admin,
      dono: UserRule.dono,
      suportedosistema: UserRule.suportedosistema,
      cliente: UserRule.cliente,
      estoque: UserRule.estoque,
    };

    return routesByAccessRule[rule];
  } catch (e) {
    return undefined;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const cookieRule = req.cookies.get("user_rule")?.value;
  const userRule = parseUserRule(cookieRule);

  const pathname = req.nextUrl.pathname;
  const protectedRoute = isProtectedRoute(pathname);

  if (!token || !userRule) {
    if (pathname === "/forbidden") {
      return redirectTo("/", req);
    }
    return protectedRoute ? redirectTo("/signin", req) : NextResponse.next();
  }

  if (pathname === "/signin") {
    let redirectPath = "/catalogo";

    switch (userRule) {
      case UserRule.admin:
      case UserRule.dono:
      case UserRule.suportedosistema:
        redirectPath = "/dashboard";
        break;
      case UserRule.cliente:
        redirectPath = "/catalogo";
        break;
      case UserRule.estoque:
        redirectPath = "/estoque";
        break;
    }

    return redirectTo(redirectPath, req);
  }

  const accessControl = new AccessControl(userRule);
  const canAccess = accessControl.canAccess(pathname);

  if (protectedRoute && !canAccess) {
    return redirectTo("/forbidden", req);
  }

  return NextResponse.next();
}

export const settings = {
  matcher: ["/dashboard/:path*", "/catalogo/:path*", "/dono/:path*", "/signin"],
};
