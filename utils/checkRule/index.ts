export enum UserRule {
  Support = "Support",
  Client = "Client",
}

interface CheckRules {
  canAccess(path: string): boolean;
}

class SpecialAccess implements CheckRules {
  canAccess(path: string): boolean {
    return path.startsWith("/chat");
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
      case UserRule.Support:
        this.strategy = new SpecialAccess();
        break;
      case UserRule.Client:
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
