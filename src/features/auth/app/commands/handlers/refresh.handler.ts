import { envs } from '@core/config/envs.config';
import {
  Payload,
  RefreshToken,
  type IJwtRepository,
  type IRefreshTokenRepository,
} from '@features/auth/domain';
import { JwtToken, RefreshTokenToken } from '@features/auth/infra/persistence';
import type { IUserRepository, User } from '@features/user/domain';
import { UserToken } from '@features/user/infra/persistence';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { RefreshCommand } from '../impl/refresh.command';

@CommandHandler(RefreshCommand)
export class RefreshHandler {
  constructor(
    @Inject(JwtToken)
    private readonly jwtToken: IJwtRepository,
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
    @Inject(RefreshTokenToken)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(
    command: RefreshCommand,
  ): Promise<{ user: User; token: string; refreshToken: string }> {
    const payload = this.jwtToken.verifyToken(command.refreshToken, 'refresh');
    if (!payload?.jti) {
      throw new UnauthorizedException('Invalid token');
    }

    const stored = await this.refreshTokenRepository.findByJti(payload.jti);
    if (!stored || stored.isRevoked || stored.isExpired) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userRepository.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    if (!user.isActive) {
      throw new UnauthorizedException(
        'User is not active, please contact the administrator',
      );
    }

    await this.refreshTokenRepository.revoke(payload.jti);

    const payloadAccess = Payload.createAccess(user.id, user.tenantId);
    const payloadRefresh = Payload.createRefresh(user.id, user.tenantId);

    const newRefreshToken = RefreshToken.create(
      payloadRefresh.jti!,
      user.id,
      envs.jwt.refreshExpiresIn,
      stored.ipAddress ?? '',
      stored.userAgent ?? '',
    );
    await this.refreshTokenRepository.save(newRefreshToken);

    return {
      user,
      token: this.jwtToken.generateToken(payloadAccess),
      refreshToken: this.jwtToken.generateToken(payloadRefresh),
    };
  }
}
