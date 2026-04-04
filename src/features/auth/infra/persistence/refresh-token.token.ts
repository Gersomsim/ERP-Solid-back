import { Provider } from '@nestjs/common';
import { TypeOrmRefreshTokenRepository } from './typeorm-refresh-token.repository';

export const RefreshTokenToken = 'REFRESH_TOKEN_REPOSITORY';

export const RefreshTokenProvider: Provider = {
  provide: RefreshTokenToken,
  useClass: TypeOrmRefreshTokenRepository,
};
