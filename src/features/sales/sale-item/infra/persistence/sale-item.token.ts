import { Provider } from '@nestjs/common';
import { TypeOrmSaleItemRepository } from './typeorm-sale-item.repository';

export const SaleItemToken = 'SALE_ITEM_TOKEN';

export const SaleItemProvider: Provider = {
  provide: SaleItemToken,
  useClass: TypeOrmSaleItemRepository,
};
