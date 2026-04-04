import { RefreshToken } from './refresh-token.model';

export interface IRefreshTokenRepository {
  save(refreshToken: RefreshToken): Promise<void>;
  findByJti(jti: string): Promise<RefreshToken | null>;
  revoke(jti: string): Promise<void>;
}
