import { Payload } from './payload.model';

export interface IJwtRepository {
  generateToken(payload: Payload): string;
  verifyToken(token: string, type: 'access' | 'refresh'): Payload | null;
}
