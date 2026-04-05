import { Pagination } from '@features/common/interfaces';
import { SalePayment } from './sale-payment.model';

export interface ISalePaymentRepository {
  create(payment: SalePayment): Promise<SalePayment>;
  findById(id: string): Promise<SalePayment | null>;
  findAll(params: FindAllSalePaymentsParams): Promise<Pagination<SalePayment>>;
  update(payment: SalePayment): Promise<SalePayment>;
  delete(id: string): Promise<void>;
}

export interface FindAllSalePaymentsParams {
  saleId: string;
  page?: number;
  limit?: number;
}
