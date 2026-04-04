import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePermissionHandler } from '../app/commands';
import { PermissionController } from './http/permission.controller';
import { PermissionEntity, PermissionProvider } from './persistence';
import { PermissionSeeder } from './seeders/permission.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity]), CqrsModule],
  controllers: [PermissionController],
  providers: [PermissionProvider, CreatePermissionHandler, PermissionSeeder],
  exports: [TypeOrmModule],
})
export class PermissionModule {}
