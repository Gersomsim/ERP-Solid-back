import { envs } from '@core/config/envs.config';
import { Payload } from '@features/auth/domain';
import type { IUserRepository } from '@features/user/domain';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserToken } from '../../../user/infra/persistence';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.jwt.secret,
    });
  }
  async validate(payload: Payload) {
    if (payload.type === 'refresh') {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.userRepository.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('Invalid token');
    }
    if (user.tenantId) {
      // TODO: validate tenant
    }

    return {
      user: user,
      tenant: null,
    };
  }
}
