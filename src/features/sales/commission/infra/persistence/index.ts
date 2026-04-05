export * from './commission.entity';
export * from './commission.token';
export * from './typeorm-commission.repository';

import { CommissionToken } from './commission.token';
import { TypeOrmCommissionRepository } from './typeorm-commission.repository';

export const CommissionProvider = {
  provide: CommissionToken,
  useClass: TypeOrmCommissionRepository,
};
