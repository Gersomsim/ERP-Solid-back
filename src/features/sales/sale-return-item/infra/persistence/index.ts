export * from './sale-return-item.entity';
export * from './sale-return-item.token';
export * from './typeorm-sale-return-item.repository';

import { SaleReturnItemToken } from './sale-return-item.token';
import { TypeOrmSaleReturnItemRepository } from './typeorm-sale-return-item.repository';

export const SaleReturnItemProvider = {
  provide: SaleReturnItemToken,
  useClass: TypeOrmSaleReturnItemRepository,
};
