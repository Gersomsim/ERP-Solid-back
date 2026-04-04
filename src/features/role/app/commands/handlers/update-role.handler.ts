import { type IPermissionRepository } from '@features/permission/domain';
import { PermissionToken } from '@features/permission/infra/persistence';
import { Role, type IRoleRepository } from '@features/role/domain';
import { RoleToken } from '@features/role/infra/persistence';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleCommand } from '../impl/update-role.command';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    @Inject(RoleToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(PermissionToken)
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<Role> {
    const existing = await this.roleRepository.findById(command.id);
    if (!existing) throw new NotFoundException('Role not found');

    existing.name = command.name ?? existing.name;

    if (command.permissionSlugs !== undefined) {
      existing.permissions = await this.permissionRepository.findBySlugs(
        command.permissionSlugs,
      );
    }

    return this.roleRepository.update(existing);
  }
}
