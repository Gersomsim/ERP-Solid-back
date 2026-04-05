import { Pagination } from '@features/common/interfaces';
import { PaymentTerm } from './payment-term.model';

export interface IPaymentTermRepository {
  create(term: PaymentTerm): Promise<PaymentTerm>;
  findById(id: string): Promise<PaymentTerm | null>;
  findAll(params: FindAllPaymentTermsParams): Promise<Pagination<PaymentTerm>>;
  update(term: PaymentTerm): Promise<PaymentTerm>;
  delete(id: string): Promise<void>;
}

export interface FindAllPaymentTermsParams {
  tenantId: string;
  page?: number;
  limit?: number;
  search?: string;
}
