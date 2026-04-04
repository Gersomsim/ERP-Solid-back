import { envs } from '@core/config/envs.config';
import { IJwtRepository, Payload } from '@features/auth/domain';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtRepository implements IJwtRepository {
  constructor(private readonly jwtService: JwtService) {}

  private getOptions(type: 'access' | 'refresh'): JwtSignOptions {
    if (type === 'refresh') {
      return {
        secret: envs.jwt.refreshSecret,
        expiresIn: `${envs.jwt.refreshExpiresIn}d`,
      };
    }
    return {
      secret: envs.jwt.secret,
      expiresIn: `${envs.jwt.expiresIn}h`,
    };
  }

  generateToken(payload: Payload): string {
    return this.jwtService.sign({ ...payload }, this.getOptions(payload.type));
  }

  verifyToken(
    token: string,
    type: 'access' | 'refresh' = 'access',
  ): Payload | null {
    try {
      const payload: Payload = this.jwtService.verify(token, {
        secret: this.getOptions(type).secret,
      });
      return payload;
    } catch (errr) {
      console.log(errr);
      return null;
    }
  }
}
