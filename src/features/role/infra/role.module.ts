import {
  CreateRoleHandler,
  DeleteRoleHandler,
  UpdateRoleHandler,
} from '@features/role/app/commands';
import { FindAllRolesHandler, FindRoleHandler } from '@features/role/app/queries';
import { PermissionModule } from '@features/permission/infra/permission.module';
import { UserModule } from '@features/user/infra/user.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './http/role.controller';
import { RoleEntity, RoleProvider } from './persistence';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    CqrsModule,
    PermissionModule,
    UserModule,
  ],
  controllers: [RoleController],
  providers: [
    RoleProvider,
    CreateRoleHandler,
    UpdateRoleHandler,
    DeleteRoleHandler,
    FindRoleHandler,
    FindAllRolesHandler,
  ],
  exports: [RoleProvider, TypeOrmModule],
})
export class RoleModule {}
