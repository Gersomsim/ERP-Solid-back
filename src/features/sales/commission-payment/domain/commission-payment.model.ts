import { CommissionPaymentStatus } from './commission-payment-status.enum';

export class CommissionPayment {
  id: string;
  agentId: string;
  tenantId: string;
  periodFrom: Date;
  periodTo: Date;
  totalAmount: number;
  status: CommissionPaymentStatus;

  constructor() {}

  static create(
    agentId: string,
    tenantId: string,
    periodFrom: Date,
    periodTo: Date,
    totalAmount: number,
  ): CommissionPayment {
    const payment = new CommissionPayment();
    payment.agentId = agentId;
    payment.tenantId = tenantId;
    payment.periodFrom = periodFrom;
    payment.periodTo = periodTo;
    payment.totalAmount = totalAmount;
    payment.status = CommissionPaymentStatus.DRAFT;
    return payment;
  }
}
