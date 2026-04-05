import { Pagination } from '@features/common/interfaces';
import { CommissionPayment } from './commission-payment.model';

export interface ICommissionPaymentRepository {
  create(payment: CommissionPayment): Promise<CommissionPayment>;
  findById(id: string): Promise<CommissionPayment | null>;
  findAll(params: FindAllCommissionPaymentsParams): Promise<Pagination<CommissionPayment>>;
  update(payment: CommissionPayment): Promise<CommissionPayment>;
  delete(id: string): Promise<void>;
}

export interface FindAllCommissionPaymentsParams {
  tenantId: string;
  page?: number;
  limit?: number;
  agentId?: string;
}
