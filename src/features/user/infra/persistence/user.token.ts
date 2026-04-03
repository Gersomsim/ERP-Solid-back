import { Provider } from '@nestjs/common';
import { TypeOrmUserRepository } from './typeorm-user.repository';

export const UserToken = 'USER_TOKEN';

export const UserProvider: Provider = {
  provide: UserToken,
  useClass: TypeOrmUserRepository,
};
