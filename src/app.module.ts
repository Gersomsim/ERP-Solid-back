import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './features/auth/infra/auth.module';
import { ProfileModule } from './features/profile/infra/profile.module';
import { TenantModule } from './features/tenant/infra/tenant.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProfileModule, TenantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
