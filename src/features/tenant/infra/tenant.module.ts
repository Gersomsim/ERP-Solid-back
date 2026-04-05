import {
  CreateTenantHandler,
  UpdateTenantHandler,
  UpdateTenantSettingsHandler,
} from '@features/tenant/app/commands';
import { FindTenantHandler } from '@features/tenant/app/queries';
import { UserModule } from '@features/user/infra/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantController } from './http/tenant.controller';
import { TenantEntity, TenantProvider } from './persistence';

@Module({
  imports: [
    TypeOrmModule.forFeature([TenantEntity]),
    CqrsModule,
    forwardRef(() => UserModule),
  ],
  controllers: [TenantController],
  providers: [
    TenantProvider,
    CreateTenantHandler,
    UpdateTenantHandler,
    UpdateTenantSettingsHandler,
    FindTenantHandler,
  ],
  exports: [TypeOrmModule, TenantProvider],
})
export class TenantModule {}
