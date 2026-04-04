import { type IRoleRepository } from '@features/role/domain';
import { RoleToken } from '@features/role/infra/persistence';
import { type IUserRepository } from '@features/user/domain';
import { UserToken } from '@features/user/infra/persistence';
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoleCommand } from '../impl/delete-role.command';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(
    @Inject(RoleToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: DeleteRoleCommand): Promise<void> {
    const role = await this.roleRepository.findById(command.id);
    if (!role) throw new NotFoundException('Role not found');

    const hasUsers = await this.userRepository.existsByRoleId(command.id);
    if (hasUsers) {
      throw new ConflictException(
        'Cannot delete role: one or more users are assigned to it',
      );
    }

    await this.roleRepository.delete(command.id);
  }
}
