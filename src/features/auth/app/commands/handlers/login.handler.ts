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
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../impl/login.command';

@CommandHandler(LoginCommand)
export class LoginHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
    @Inject(JwtToken)
    private readonly jwtToken: IJwtRepository,
    @Inject(RefreshTokenToken)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(
    command: LoginCommand,
  ): Promise<{ user: User; token: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    if (!user.isActive) {
      throw new Error('User is not active, please contact the administrator');
    }
    const isPasswordValid = await this.userRepository.validatePassword(
      command.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    await this.userRepository.updateLastLogin(user.id, new Date());

    const payloadAccess = Payload.createAccess(user.id, user.tenantId);
    const payloadRefresh = Payload.createRefresh(user.id, user.tenantId);

    const refreshToken = RefreshToken.create(
      payloadRefresh.jti!,
      user.id,
      envs.jwt.refreshExpiresIn,
      command.ipAddress,
      command.userAgent,
    );
    await this.refreshTokenRepository.save(refreshToken);
    user.unSetPassword();
    return {
      user,
      token: this.jwtToken.generateToken(payloadAccess),
      refreshToken: this.jwtToken.generateToken(payloadRefresh),
    };
  }
}
