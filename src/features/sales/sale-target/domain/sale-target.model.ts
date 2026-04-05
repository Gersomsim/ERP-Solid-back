export class SaleTarget {
  id: string;
  agentId: string;
  tenantId: string;
  periodFrom: Date;
  periodTo: Date;
  targetAmount: number;

  constructor() {}

  static create(
    agentId: string,
    tenantId: string,
    periodFrom: Date,
    periodTo: Date,
    targetAmount: number,
  ): SaleTarget {
    const target = new SaleTarget();
    target.agentId = agentId;
    target.tenantId = tenantId;
    target.periodFrom = periodFrom;
    target.periodTo = periodTo;
    target.targetAmount = targetAmount;
    return target;
  }
}
