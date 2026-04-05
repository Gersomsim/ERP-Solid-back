import { Pagination } from '@features/common/interfaces';
import { PriceListItem } from './price-list-item.model';
import { PriceListItemView } from './price-list-item.view';

export interface IPriceListItemRepository {
  // write
  create(item: PriceListItem): Promise<PriceListItem>;
  findById(id: string): Promise<PriceListItem | null>;
  update(item: PriceListItem): Promise<PriceListItem>;
  delete(id: string): Promise<void>;

  // read (with join)
  findAllView(
    params: FindAllPriceListItemsParams,
  ): Promise<Pagination<PriceListItemView>>;
  findViewById(id: string): Promise<PriceListItemView | null>;
}

export interface FindAllPriceListItemsParams {
  priceListId: string;
  page?: number;
  limit?: number;
  search?: string;
}
