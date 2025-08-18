(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__a65ee6bb._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/utils/checkRule.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AccessControl": (()=>AccessControl),
    "UserRule": (()=>UserRule)
});
var UserRule = /*#__PURE__*/ function(UserRule) {
    UserRule["admin"] = "admin";
    UserRule["dono"] = "Dono";
    UserRule["estoque"] = "estoque";
    UserRule["suportedosistema"] = "suporte do sistema";
    UserRule["cliente"] = "cliente";
    return UserRule;
}({});
class SpecialAccess {
    canAccess(path) {
        return path.startsWith("/dashboard");
    }
}
class ClientAccess {
    canAccess(path) {
        return path.startsWith("/catalogo");
    }
}
class AccessControl {
    strategy;
    constructor(rule){
        switch(rule){
            case "admin":
            case "Dono":
            case "suporte do sistema":
                this.strategy = new SpecialAccess();
                break;
            case "cliente":
                this.strategy = new ClientAccess();
                break;
            default:
                throw new Error("Regra de usuário desconhecida");
        }
    }
    canAccess(path) {
        return this.strategy.canAccess(path);
    }
}
}}),
"[project]/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Next
__turbopack_context__.s({
    "middleware": (()=>middleware),
    "settings": (()=>settings)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
// Utils
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/checkRule.ts [middleware-edge] (ecmascript)");
;
;
const protectedRoutes = [
    "/dashboard"
];
function isProtectedRoute(pathname) {
    return protectedRoutes.some((router)=>pathname.startsWith(router));
}
function redirectTo(path, req) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(path, req.url));
}
function parseUserRule(access) {
    if (!access) return undefined;
    try {
        let rule = decodeURIComponent(access);
        rule = rule.trim().toLowerCase().replace(/[\s\-_]+/g, "");
        rule = rule.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const routesByAccessRule = {
            admin: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRule"].admin,
            dono: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRule"].dono,
            suportedosistema: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRule"].suportedosistema,
            cliente: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRule"].cliente,
            estoque: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRule"].estoque
        };
        return routesByAccessRule[rule];
    } catch (e) {
        return undefined;
    }
}
function middleware(req) {
    const token = req.cookies.get("auth_token")?.value;
    const cookieRule = req.cookies.get("user_rule")?.value;
    const userRule = parseUserRule(cookieRule);
    const pathname = req.nextUrl.pathname;
    const protectedRoute = isProtectedRoute(pathname);
    if (!token || !userRule) {
        if (pathname === "/forbidden") {
            return redirectTo("/", req);
        }
        return protectedRoute ? redirectTo("/signin", req) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    if (pathname === "/signin") {
        let redirectPath = "/catalogo";
        switch(userRule){
            case __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRule"].admin:
            case __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRule"].dono:
            case __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRule"].suportedosistema:
                redirectPath = "/dashboard";
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRule"].cliente:
                redirectPath = "/catalogo";
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["UserRule"].estoque:
                redirectPath = "/estoque";
                break;
        }
        return redirectTo(redirectPath, req);
    }
    const accessControl = new __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["AccessControl"](userRule);
    const canAccess = accessControl.canAccess(pathname);
    if (protectedRoute && !canAccess) {
        return redirectTo("/forbidden", req);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const settings = {
    matcher: [
        "/dashboard/:path*",
        "/catalogo/:path*",
        "/dono/:path*",
        "/signin"
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__a65ee6bb._.js.map