import { Provider } from '@nestjs/common';
import { TypeOrmRoleRepository } from './typeorm-role.repository';

export const RoleToken = 'ROLE_TOKEN';

export const RoleProvider: Provider = {
  provide: RoleToken,
  useClass: TypeOrmRoleRepository,
};
