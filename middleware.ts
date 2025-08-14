// Next
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

function parseUserRule(raw?: string): RegraUsuario | undefined {
  if (!raw) return undefined;

  try {
    let normalized = decodeURIComponent(raw);
    normalized = normalized.trim().toLowerCase();

    normalized = normalized.replace(/[\s\-_]+/g, "");

    normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const map: Record<string, RegraUsuario> = {
      admin: RegraUsuario.admin,
      dono: RegraUsuario.dono,
      suportedosistema: RegraUsuario.suportedosistema,
      cliente: RegraUsuario.cliente,
      estoque: RegraUsuario.estoque,
    };

    return map[normalized];
  } catch (e) {
    return undefined;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const cookieRule = request.cookies.get("user_rule")?.value as RegraUsuario;
  const userRule = parseUserRule(cookieRule);

  const pathname = request.nextUrl.pathname;
  const protegido = isProtectedRoute(pathname);

  if (!token || !userRule) {
    return protegido ? redirectTo("/signin", request) : NextResponse.next();
  }

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

  const podeAcessar = podeAcessarRota(userRule, pathname);
  if (protegido && !podeAcessar) {
    return redirectTo("/forbidden", request);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/catalogo/:path*", "/dono/:path*", "/signin"],
};
