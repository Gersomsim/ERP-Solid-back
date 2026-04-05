export * from './price-list-item.entity';
export * from './price-list-item.token';
export * from './typeorm-price-list-item.repository';

import { PriceListItemToken } from './price-list-item.token';
import { TypeOrmPriceListItemRepository } from './typeorm-price-list-item.repository';

export const PriceListItemProvider = {
  provide: PriceListItemToken,
  useClass: TypeOrmPriceListItemRepository,
};
