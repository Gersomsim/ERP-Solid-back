import { Pagination } from '@features/common/interfaces';
import { SaleReturnItem } from './sale-return-item.model';

export interface ISaleReturnItemRepository {
  create(item: SaleReturnItem): Promise<SaleReturnItem>;
  findById(id: string): Promise<SaleReturnItem | null>;
  findAll(params: FindAllSaleReturnItemsParams): Promise<Pagination<SaleReturnItem>>;
  delete(id: string): Promise<void>;
}

export interface FindAllSaleReturnItemsParams {
  saleReturnId: string;
  page?: number;
  limit?: number;
}
