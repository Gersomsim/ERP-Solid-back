import { envs } from '@core/config/envs.config';
import { Payload } from '@features/auth/domain';
import type { ITenantRepository, Tenant } from '@features/tenant/domain';
import { TenantToken } from '@features/tenant/infra/persistence';
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
    @Inject(TenantToken)
    private readonly tenantRepository: ITenantRepository,
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
    let tenant: Tenant | null = null;
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('Invalid token');
    }
    if (user.tenantId) {
      tenant = await this.tenantRepository.findById(user.tenantId);
      if (!tenant) {
        throw new UnauthorizedException('Invalid token');
      }
    }

    return {
      user: user,
      tenant: tenant,
    };
  }
}
