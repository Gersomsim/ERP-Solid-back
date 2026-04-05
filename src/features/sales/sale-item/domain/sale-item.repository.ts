import { Pagination } from '@features/common/interfaces';
import { SaleItem } from './sale-item.model';

export interface ISaleItemRepository {
  create(item: SaleItem): Promise<SaleItem>;
  findById(id: string): Promise<SaleItem | null>;
  findAll(params: FindAllSaleItemsParams): Promise<Pagination<SaleItem>>;
  update(item: SaleItem): Promise<SaleItem>;
  delete(id: string): Promise<void>;
}

export interface FindAllSaleItemsParams {
  saleId: string;
  page?: number;
  limit?: number;
}
