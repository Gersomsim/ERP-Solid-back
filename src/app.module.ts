import { AuthModule } from '@features/auth/infra/auth.module';
import { ProfileModule } from '@features/profile/infra/profile.module';
import { TenantModule } from '@features/tenant/infra/tenant.module';
import { TokenModule } from '@features/token/infra/token.module';
import { UserModule } from '@features/user/infra/user.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ProfileModule,
    TenantModule,
    UserModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
