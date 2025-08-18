export enum UserRule {
  admin = "admin",
  dono = "Dono",
  estoque = "estoque",
  suportedosistema = "suporte do sistema",
  cliente = "cliente",
}

interface CheckRules {
  canAccess(path: string): boolean;
}

class SpecialAccess implements CheckRules {
  canAccess(path: string): boolean {
    return path.startsWith("/dashboard");
  }
}

class ClientAccess implements CheckRules {
  canAccess(path: string): boolean {
    return path.startsWith("/catalogo");
  }
}

export class AccessControl {
  private strategy: CheckRules;

  constructor(rule: UserRule) {
    switch (rule) {
      case UserRule.admin:
      case UserRule.dono:
      case UserRule.suportedosistema:
        this.strategy = new SpecialAccess();
        break;
      case UserRule.cliente:
        this.strategy = new ClientAccess();
        break;
      default:
        throw new Error("Regra de usuário desconhecida");
    }
  }

  canAccess(path: string): boolean {
    return this.strategy.canAccess(path);
  }
}
