import { type ITokenRepository } from '@features/token/domain';
import { HashToken } from '@features/token/infra/persistence';
import { type IUserRepository } from '@features/user/domain';
import { UserToken } from '@features/user/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ResetPasswordCommand } from '../impl/reset-password.command';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand> {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
    @Inject(HashToken)
    private readonly tokenRepository: ITokenRepository,
  ) {}

  async execute(command: ResetPasswordCommand): Promise<boolean> {
    const selector = command.token.split('.')[0];
    const token = await this.tokenRepository.findBySelector(selector);
    if (!token) {
      throw new Error('Invalid token');
    }
    const isValid = await this.tokenRepository.validateToken(
      command.token,
      token.hashedToken!,
    );
    if (!isValid) {
      throw new Error('Invalid token');
    }
    const user = await this.userRepository.findById(token.userId);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.update(user, command.password);
    await this.tokenRepository.revoke(token.id);
    return true;
  }
}
