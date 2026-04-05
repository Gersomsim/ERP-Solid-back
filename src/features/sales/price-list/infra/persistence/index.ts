export * from './price-list.entity';
export * from './price-list.token';
export * from './typeorm-price-list.repository';

import { PriceListToken } from './price-list.token';
import { TypeOrmPriceListRepository } from './typeorm-price-list.repository';

export const PriceListProvider = {
  provide: PriceListToken,
  useClass: TypeOrmPriceListRepository,
};
