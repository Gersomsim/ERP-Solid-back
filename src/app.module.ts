import { HttpExceptionFilter } from '@core/filters/http-exception.filter';
import { AuthModule } from '@features/auth/infra/auth.module';
import { ProfileModule } from '@features/profile/infra/profile.module';
import { TenantModule } from '@features/tenant/infra/tenant.module';
import { TokenModule } from '@features/token/infra/token.module';
import { UserModule } from '@features/user/infra/user.module';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseModule } from './core/database/database.module';
import { MailerModule } from './core/mailer/mailer.module';
import { PermissionModule } from './features/permission/infra/permission.module';
import { RoleModule } from './features/role/infra/role.module';

@Module({
  imports: [
    PermissionModule,
    DatabaseModule,
    AuthModule,
    ProfileModule,
    TenantModule,
    UserModule,
    TokenModule,
    MailerModule,
    RoleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
