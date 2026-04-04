import { Provider } from '@nestjs/common';
import { TypeOrmTokenRepository } from './typeorm-token.repository';

export const HashToken = 'hash-token';

export const HashTokenProvider: Provider = {
  provide: HashToken,
  useClass: TypeOrmTokenRepository,
};
