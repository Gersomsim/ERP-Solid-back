import { Pagination } from '@features/common/interfaces';
import { PriceList } from './price-list.model';

export interface IPriceListRepository {
  create(priceList: PriceList): Promise<PriceList>;
  findById(id: string): Promise<PriceList | null>;
  findAll(params: FindAllPriceListsParams): Promise<Pagination<PriceList>>;
  update(priceList: PriceList): Promise<PriceList>;
  delete(id: string): Promise<void>;
}

export interface FindAllPriceListsParams {
  tenantId: string;
  page?: number;
  limit?: number;
  search?: string;
}
