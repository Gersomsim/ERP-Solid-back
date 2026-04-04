import {
  type IJwtRepository,
  type IRefreshTokenRepository,
} from '@features/auth/domain';
import { JwtToken, RefreshTokenToken } from '@features/auth/infra/persistence';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LogoutCommand } from '../impl/logout.command';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(
    @Inject(RefreshTokenToken)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    @Inject(JwtToken)
    private readonly jwtRepository: IJwtRepository,
  ) {}
  async execute(command: LogoutCommand): Promise<boolean> {
    const payload = this.jwtRepository.verifyToken(
      command.refreshToken,
      'refresh',
    );
    if (!payload || !payload.jti) {
      throw new UnauthorizedException('Invalid token');
    }
    const stored = await this.refreshTokenRepository.findByJti(payload.jti);
    if (!stored || stored.isRevoked || stored.isExpired) {
      throw new UnauthorizedException('Invalid token');
    }
    await this.refreshTokenRepository.revoke(payload.jti);
    return true;
  }
}
