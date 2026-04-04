import type { IUserRepository } from '@features/user/domain';
import { UserToken } from '@features/user/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../impl/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(command: UpdateUserCommand): Promise<boolean> {
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.update(user);
    return true;
  }
}
