import { Provider } from '@nestjs/common';
import { TypeOrmSaleRepository } from './typeorm-sale.repository';

export const SaleToken = 'SALE_TOKEN';

export const SaleProvider: Provider = {
  provide: SaleToken,
  useClass: TypeOrmSaleRepository,
};
