(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__49ea3af4._.js", {

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
    "RegraUsuario": (()=>RegraUsuario),
    "checkRule": (()=>checkRule),
    "isCliente": (()=>isCliente),
    "podeAcessarRota": (()=>podeAcessarRota)
});
var RegraUsuario = /*#__PURE__*/ function(RegraUsuario) {
    RegraUsuario["admin"] = "admin";
    RegraUsuario["dono"] = "dono";
    RegraUsuario["estoque"] = "estoque";
    RegraUsuario["suportedosistema"] = "suporte do sistema";
    RegraUsuario["cliente"] = "cliente";
    return RegraUsuario;
}({});
function checkRule(regra) {
    const permissoesEspeciais = new Set([
        "admin",
        "dono",
        "suporte do sistema"
    ]);
    return permissoesEspeciais.has(regra);
}
function isCliente(regra) {
    return regra === "cliente";
}
function podeAcessarRota(regra, path) {
    if (checkRule(regra)) {
        return true;
    }
    if (isCliente(regra)) {
        const permitido = path.startsWith("/catalogo");
        return permitido;
    }
    return false;
}
}}),
"[project]/provider/auth.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthContext": (()=>AuthContext),
    "AuthProvider": (()=>AuthProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [middleware-edge] (ecmascript)");
;
const AuthContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AuthContext() from the server but AuthContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/provider/auth.tsx <module evaluation>", "AuthContext");
const AuthProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/provider/auth.tsx <module evaluation>", "AuthProvider");
}}),
"[project]/provider/auth.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthContext": (()=>AuthContext),
    "AuthProvider": (()=>AuthProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [middleware-edge] (ecmascript)");
;
const AuthContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AuthContext() from the server but AuthContext is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/provider/auth.tsx", "AuthContext");
const AuthProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/provider/auth.tsx", "AuthProvider");
}}),
"[project]/provider/auth.tsx [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$provider$2f$auth$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/provider/auth.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$provider$2f$auth$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/provider/auth.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$provider$2f$auth$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Next
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/checkRule.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$provider$2f$auth$2e$tsx__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/provider/auth.tsx [middleware-edge] (ecmascript)");
;
;
;
;
// Routes that require authentication
const rotasProtegidas = [
    "/dashboard",
    "/catalogo",
    "/dono"
];
function isProtectedRoute(pathname) {
    return rotasProtegidas.some((rota)=>pathname.startsWith(rota));
}
function redirectTo(path, request) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(path, request.url));
}
function middleware(request) {
    const token = request.cookies.get("auth_token")?.value;
    const userRule = request.cookies.get("user_rule")?.value;
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$provider$2f$auth$2e$tsx__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["AuthContext"]);
    const pathname = request.nextUrl.pathname;
    const protegido = isProtectedRoute(pathname);
    // No token or rule => redirect if protected route
    if (!token || !userRule) {
        return protegido ? redirectTo("/signin", request) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Already have token and try to access /signin => redirect to area
    if (pathname === "/signin") {
        let redirectPath = "/catalogo";
        switch(userRule){
            case __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RegraUsuario"].admin:
            case __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RegraUsuario"].dono:
            case __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RegraUsuario"].suportedosistema:
                redirectPath = "/dashboard";
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RegraUsuario"].cliente:
                redirectPath = "/catalogo";
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RegraUsuario"].estoque:
                redirectPath = "/estoque";
                break;
        }
        return redirectTo(redirectPath, request);
    }
    // If route is protected and user cannot access
    const podeAcessar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$checkRule$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["podeAcessarRota"])(userRule, pathname);
    if (protegido && !podeAcessar) {
        return redirectTo("/forbidden", request);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/dashboard/:path*",
        "/catalogo/:path*",
        "/dono/:path*",
        "/signin"
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__49ea3af4._.js.map