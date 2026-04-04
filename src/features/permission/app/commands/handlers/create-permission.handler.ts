import {
  Permission,
  type IPermissionRepository,
} from '@features/permission/domain';
import { PermissionToken } from '@features/permission/infra/persistence';
import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from '../impl/create-permission.command';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler implements ICommandHandler<CreatePermissionCommand> {
  constructor(
    @Inject(PermissionToken)
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async execute(command: CreatePermissionCommand): Promise<Permission> {
    const existing = await this.permissionRepository.findBySlug(command.slug);
    if (existing) {
      throw new ConflictException(
        `Permission with slug '${command.slug}' already exists`,
      );
    }
    const permission = Permission.create(
      command.slug,
      command.name,
      command.group,
    );
    return this.permissionRepository.create(permission);
  }
}
