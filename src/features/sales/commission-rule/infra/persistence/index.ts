export * from './commission-rule.entity';
export * from './commission-rule.token';
export * from './typeorm-commission-rule.repository';

import { CommissionRuleToken } from './commission-rule.token';
import { TypeOrmCommissionRuleRepository } from './typeorm-commission-rule.repository';

export const CommissionRuleProvider = {
  provide: CommissionRuleToken,
  useClass: TypeOrmCommissionRuleRepository,
};
