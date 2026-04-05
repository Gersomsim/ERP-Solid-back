export class CommissionRule {
  id: string;
  agentId: string;
  tenantId: string;
  percentage: number;
  isActive: boolean;

  constructor() {}

  static create(
    agentId: string,
    tenantId: string,
    percentage: number,
  ): CommissionRule {
    const rule = new CommissionRule();
    rule.agentId = agentId;
    rule.tenantId = tenantId;
    rule.percentage = percentage;
    rule.isActive = true;
    return rule;
  }
}
