import { envs } from '@core/config/envs.config';
import type { IMailerRepository } from '@core/mailer/repositories/mailer.repository';
import { MailToken } from '@core/mailer/services/mail.token';
import type { ITokenRepository } from '@features/token/domain';
import { Token } from '@features/token/domain';
import { HashToken } from '@features/token/infra/persistence';
import type { IUserRepository } from '@features/user/domain';
import { UserToken } from '@features/user/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ForgotPasswordCommand } from '../impl/forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
    @Inject(HashToken)
    private readonly hashRepository: ITokenRepository,
    @Inject(MailToken)
    private readonly mailerRepository: IMailerRepository,
  ) {}
  async execute(command: ForgotPasswordCommand) {
    const { email } = command;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return 'Email sent successfully';
    }
    const hashToken = await this.hashRepository.findByUserId(
      user.id,
      'reset-password',
    );
    if (hashToken) {
      await this.hashRepository.revoke(hashToken.id);
    }

    const token = Token.create(user.id, 'reset-password');
    const data = {
      url: `${envs.app.url}/${envs.app.register}?token=${token.rawToken}`,
      expiresAt: token.expiresAt,
    };
    await this.hashRepository.create(token);
    await this.mailerRepository.sendMail(
      user.email,
      'Reset Password',
      data,
      'features/users/forgot-password',
    );
    return 'Email sent successfully';
  }
}
