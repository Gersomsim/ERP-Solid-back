import { Pagination } from '@features/common/interfaces';
import { SaleReturn } from './sale-return.model';
import { SaleReturnStatus } from './sale-return-status.enum';

export interface ISaleReturnRepository {
  create(saleReturn: SaleReturn): Promise<SaleReturn>;
  findById(id: string): Promise<SaleReturn | null>;
  findAll(params: FindAllSaleReturnsParams): Promise<Pagination<SaleReturn>>;
  update(saleReturn: SaleReturn): Promise<SaleReturn>;
  delete(id: string): Promise<void>;
}

export interface FindAllSaleReturnsParams {
  tenantId: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: SaleReturnStatus;
  saleId?: string;
}
