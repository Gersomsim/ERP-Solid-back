export * from './sale-return.entity';
export * from './sale-return.token';
export * from './typeorm-sale-return.repository';

import { SaleReturnToken } from './sale-return.token';
import { TypeOrmSaleReturnRepository } from './typeorm-sale-return.repository';

export const SaleReturnProvider = {
  provide: SaleReturnToken,
  useClass: TypeOrmSaleReturnRepository,
};
