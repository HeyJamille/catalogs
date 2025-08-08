import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { RegraUsuario, podeAcessarRota } from "./utils/checkRule";

// Routes that require authentication
const rotasProtegidas = ["/dashboard", "/catalogo", "/dono"];

function isProtectedRoute(pathname: string): boolean {
  return rotasProtegidas.some((rota) => pathname.startsWith(rota));
}

function redirectTo(path: string, request: NextRequest) {
  return NextResponse.redirect(new URL(path, request.url));
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const userRule = request.cookies.get("user_rule")?.value as RegraUsuario;

  const pathname = request.nextUrl.pathname;
  const protegido = isProtectedRoute(pathname);

  // No token or rule => redirect if protected route
  if (!token || !userRule) {
    return protegido ? redirectTo("/signin", request) : NextResponse.next();
  }

  // Already have token and try to access /signin => redirect to area
  if (pathname === "/signin") {
    let redirectPath = "/catalogo";

    switch (userRule) {
      case RegraUsuario.admin:
      case RegraUsuario.dono:
      case RegraUsuario.suportedosistema:
        redirectPath = "/dashboard";
        break;
      case RegraUsuario.cliente:
        redirectPath = "/catalogo";
        break;
      case RegraUsuario.estoque:
        redirectPath = "/estoque";
        break;
    }

    return redirectTo(redirectPath, request);
  }

  // If route is protected and user cannot access
  const podeAcessar = podeAcessarRota(userRule, pathname);
  if (protegido && !podeAcessar) {
    return redirectTo("/forbidden", request);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/catalogo/:path*", "/dono/:path*", "/signin"],
};
