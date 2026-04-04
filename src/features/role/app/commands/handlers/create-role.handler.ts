import { type IPermissionRepository } from '@features/permission/domain';
import { PermissionToken } from '@features/permission/infra/persistence';
import { Role, type IRoleRepository } from '@features/role/domain';
import { RoleToken } from '@features/role/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from '../impl/create-role.command';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(
    @Inject(RoleToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(PermissionToken)
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async execute(command: CreateRoleCommand): Promise<Role> {
    const permissions = await this.permissionRepository.findBySlugs(
      command.permissionSlugs,
    );
    const role = Role.create(command.name, command.tenantId, permissions);
    return this.roleRepository.create(role);
  }
}
