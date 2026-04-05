export * from './commission-payment.entity';
export * from './commission-payment.token';
export * from './typeorm-commission-payment.repository';

import { CommissionPaymentToken } from './commission-payment.token';
import { TypeOrmCommissionPaymentRepository } from './typeorm-commission-payment.repository';

export const CommissionPaymentProvider = {
  provide: CommissionPaymentToken,
  useClass: TypeOrmCommissionPaymentRepository,
};
