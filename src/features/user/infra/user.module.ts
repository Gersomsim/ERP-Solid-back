import { ProfileModule } from '@features/profile/infra/profile.module';
import { TenantModule } from '@features/tenant/infra/tenant.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './persistence';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => TenantModule),
    forwardRef(() => ProfileModule),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class UserModule {}
