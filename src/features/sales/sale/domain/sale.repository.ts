import { Pagination } from '@features/common/interfaces';
import { SaleStatus } from './sale-status.enum';
import { Sale } from './sale.model';

export interface ISaleRepository {
  create(sale: Sale): Promise<Sale>;
  findById(id: string): Promise<Sale | null>;
  findAll(params: FindAllSalesParams): Promise<Pagination<Sale>>;
  update(sale: Sale): Promise<Sale>;
  delete(id: string): Promise<void>;
}

export interface FindAllSalesParams {
  tenantId: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: SaleStatus;
  customerId?: string;
  saleAgentId?: string;
}
