import { BadRequestException } from '@features/common/exceptions';
import { type IPermissionRepository } from '@features/permission/domain';
import { PermissionToken } from '@features/permission/infra/persistence';
import { Profile } from '@features/profile/domain';
import { Role, type IRoleRepository } from '@features/role/domain';
import { RoleToken } from '@features/role/infra/persistence';
import { ADMIN_ROLE_PERMISSIONS_SLUGS } from '@features/role/infra/seeders/admin-role.seed';
import { User, type IUserRepository } from '@features/user/domain';
import { UserToken } from '@features/user/infra/persistence';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from '../impl/register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
    @Inject(RoleToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(PermissionToken)
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async execute(command: RegisterCommand): Promise<string> {
    const existing = await this.userRepository.findByEmail(command.email);
    if (existing) {
      throw new BadRequestException('User already exists');
    }

    let roleId: string;

    if (command.roleId) {
      const role = await this.roleRepository.findById(command.roleId);
      if (!role) throw new NotFoundException('Role not found');
      roleId = role.id;
    } else {
      const permissions = await this.permissionRepository.findBySlugs(
        ADMIN_ROLE_PERMISSIONS_SLUGS,
      );
      const adminRole = Role.create(
        'Administrador',
        command.tenantId,
        permissions,
      );
      const savedRole = await this.roleRepository.create(adminRole);
      roleId = savedRole.id;
    }

    const newUser = User.create(
      '',
      command.email,
      command.password,
      command.tenantId,
      true,
      false,
      null,
      undefined,
      roleId,
    );
    newUser.profile = Profile.create(command.firstName, command.lastName);

    const userCreated = await this.userRepository.create(newUser);
    return userCreated.id;
  }
}
