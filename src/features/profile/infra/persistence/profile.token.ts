import { Provider } from '@nestjs/common';
import { TypeOrmProfileRepository } from './typeorm-profile.repository';

export const ProfileToken = 'PROFILE_TOKEN';

export const ProfileProvider: Provider = {
  provide: ProfileToken,
  useClass: TypeOrmProfileRepository,
};
