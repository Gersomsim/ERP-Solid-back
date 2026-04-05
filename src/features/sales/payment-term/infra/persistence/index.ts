export * from './payment-term.entity';
export * from './payment-term.token';
export * from './typeorm-payment-term.repository';

import { PaymentTermToken } from './payment-term.token';
import { TypeOrmPaymentTermRepository } from './typeorm-payment-term.repository';

export const PaymentTermProvider = {
  provide: PaymentTermToken,
  useClass: TypeOrmPaymentTermRepository,
};
