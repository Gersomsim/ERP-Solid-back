import type { IUserRepository } from '@features/user/domain';
import { UserToken } from '@features/user/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangePasswordCommand } from '../impl/change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(command: ChangePasswordCommand): Promise<boolean> {
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new Error('User not found');
    }
    const validPassword = await this.userRepository.validatePassword(
      command.oldPassword,
      user.password,
    );
    if (!validPassword) {
      throw new Error('Invalid password');
    }
    await this.userRepository.update(user, command.newPassword);
    return true;
  }
}
