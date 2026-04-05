import { Provider } from '@nestjs/common';
import { TypeOrmSalePaymentRepository } from './typeorm-sale-payment.repository';

export const SalePaymentToken = 'SALE_PAYMENT_TOKEN';

export const SalePaymentProvider: Provider = {
  provide: SalePaymentToken,
  useClass: TypeOrmSalePaymentRepository,
};
