export * from './sale-target.entity';
export * from './sale-target.token';
export * from './typeorm-sale-target.repository';

import { SaleTargetToken } from './sale-target.token';
import { TypeOrmSaleTargetRepository } from './typeorm-sale-target.repository';

export const SaleTargetProvider = {
  provide: SaleTargetToken,
  useClass: TypeOrmSaleTargetRepository,
};
