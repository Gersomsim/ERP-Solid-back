import { UserModule } from '@features/user/infra/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './persistence';

@Module({
  imports: [
    TypeOrmModule.forFeature([TenantEntity]),
    forwardRef(() => UserModule),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class TenantModule {}
