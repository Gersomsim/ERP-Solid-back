import { CommissionStatus } from './commission-status.enum';

export class Commission {
  id: string;
  saleId: string;
  agentId: string;
  tenantId: string;
  saleTotal: number;
  percentage: number;
  amount: number;
  status: CommissionStatus;
  commissionPaymentId: string | null;

  constructor() {}

  static create(
    saleId: string,
    agentId: string,
    tenantId: string,
    saleTotal: number,
    percentage: number,
  ): Commission {
    const commission = new Commission();
    commission.saleId = saleId;
    commission.agentId = agentId;
    commission.tenantId = tenantId;
    commission.saleTotal = saleTotal;
    commission.percentage = percentage;
    commission.amount = Number(((saleTotal * percentage) / 100).toFixed(2));
    commission.status = CommissionStatus.PENDING;
    commission.commissionPaymentId = null;
    return commission;
  }
}
