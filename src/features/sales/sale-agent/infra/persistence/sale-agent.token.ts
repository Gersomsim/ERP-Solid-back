import { Provider } from '@nestjs/common';
import { TypeOrmSaleAgentRepository } from './typeorm-sale-agent.repository';

export const SaleAgentToken = 'SALE_AGENT_TOKEN';

export const SaleAgentProvider: Provider = {
  provide: SaleAgentToken,
  useClass: TypeOrmSaleAgentRepository,
};
