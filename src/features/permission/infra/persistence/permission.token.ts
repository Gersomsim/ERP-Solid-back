import { Provider } from '@nestjs/common';
import { TypeOrmPermissionRepository } from './typeorm-permission.repository';

export const PermissionToken = 'PERMISSION_TOKEN';

export const PermissionProvider: Provider = {
  provide: PermissionToken,
  useClass: TypeOrmPermissionRepository,
};
