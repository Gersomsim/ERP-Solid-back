import { Token } from './token.model';

export interface ITokenRepository {
  create(token: Token): Promise<Token>;
  findBySelector(selector: string): Promise<Token | null>;
  delete(id: string): Promise<void>;
  validateToken(token: string, hashedToken: string): Promise<boolean>;
  revoke(id: string): Promise<void>;
  findByUserId(userId: string, type: string): Promise<Token | null>;
}
