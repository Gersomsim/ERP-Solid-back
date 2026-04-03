import { Provider } from '@nestjs/common';
import { JwtRepository } from './jwt.repository';

export const JwtToken = 'JWT_TOKEN';

export const JwtProvider: Provider = {
  provide: JwtToken,
  useClass: JwtRepository,
};
