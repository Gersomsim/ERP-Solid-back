import { Profile } from '@features/profile/domain';
import { type IUserRepository, User } from '@features/user/domain';
import { UserToken } from '@features/user/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from '../impl/register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: RegisterCommand): Promise<string> {
    const user = await this.userRepository.findByEmail(command.email);
    if (user) {
      throw new Error('User already exists');
    }
    const newUser = User.create(
      '',
      command.email,
      command.password,
      command.tenantId,
      true,
      false,
      null,
    );
    newUser.profile = Profile.create(command.firstName, command.lastName);
    const userCreated = await this.userRepository.create(newUser);
    return userCreated.id;
  }
}
