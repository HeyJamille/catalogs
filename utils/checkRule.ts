export enum RegraUsuario {
  admin = "admin",
  dono = "Dono",
  estoque = "estoque",
  suportedosistema = "suporte do sistema",
  cliente = "cliente",
}

// Check if the user has special permission  (admin, dono, suporte)
export function checkRule(regra: RegraUsuario): boolean {
  const permissoesEspeciais = new Set([
    RegraUsuario.admin,
    RegraUsuario.dono,
    RegraUsuario.suportedosistema,
  ]);

  return permissoesEspeciais.has(regra);
}

// Check if the user is a client
export function isCliente(regra: RegraUsuario): boolean {
  return regra === RegraUsuario.cliente;
}

// Check if the user can access a route in the rule and path
export function podeAcessarRota(regra: RegraUsuario, path: string): boolean {
  if (checkRule(regra)) {
    return true;
  }

  if (isCliente(regra)) {
    const permitido = path.startsWith("/catalogo");
    return permitido;
  }

  return false;
}
