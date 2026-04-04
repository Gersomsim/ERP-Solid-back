import { Profile } from '@features/profile/domain';
import type { IUserRepository } from '@features/user/domain';
import { User } from '@features/user/domain';
import { UserToken } from '@features/user/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(command: CreateUserCommand): Promise<string> {
    const profile = Profile.create(command.firstName, command.lastName);
    const user = User.create(
      '',
      command.email,
      command.password,
      command.tenantId,
      false,
      '',
    );
    user.profile = profile;
    const userCreated = await this.userRepository.create(user);
    return userCreated.id;
  }
}
