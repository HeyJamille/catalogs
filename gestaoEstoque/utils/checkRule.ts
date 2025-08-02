export enum RegraUsuario {
  admin = "admin",
  dono = "dono",
  estoque = "estoque",
  suporteDoSistema = "suporteDoSistema",
  cliente = "cliente"
}

export function checkRuleUser(regra: string): boolean {
  switch (regra) {
    case RegraUsuario.admin:
    case RegraUsuario.suporteDoSistema:
    case RegraUsuario.dono:
      return true;  // user with special permission
    case RegraUsuario.estoque:
    case RegraUsuario.cliente:
    default:
      return false; // user without special permission
  }
}
