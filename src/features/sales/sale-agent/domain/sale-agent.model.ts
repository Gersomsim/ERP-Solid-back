export class SaleAgent {
  id: string;
  name: string;
  tenantId: string;
  userId: string | null;
  commissionRate: number;

  constructor() {}

  static create(
    name: string,
    tenantId: string,
    commissionRate: number,
    userId?: string | null,
  ): SaleAgent {
    const agent = new SaleAgent();
    agent.name = name;
    agent.tenantId = tenantId;
    agent.commissionRate = commissionRate;
    agent.userId = userId ?? null;
    return agent;
  }
}
