import { Provider } from '@nestjs/common';
import { TypeOrmTenantRepository } from './typeorm-tenant.repository';

export const TenantToken = 'TENANT_TOKEN';

export const TenantProvider: Provider = {
  provide: TenantToken,
  useClass: TypeOrmTenantRepository,
};
