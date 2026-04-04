import { LoginHandler, RefreshHandler } from '@features/auth/app/commands';
import { ForgotPasswordHandler } from '@features/auth/app/commands/handlers/forgot-password.handler';
import { RegisterHandler } from '@features/auth/app/commands/handlers/register.handler';
import { ResetPasswordHandler } from '@features/auth/app/commands/handlers/reset-password.handler';
import { PermissionModule } from '@features/permission/infra/permission.module';
import { RoleModule } from '@features/role/infra/role.module';
import { TokenModule } from '@features/token/infra/token.module';
import { UserModule } from '@features/user/infra/user.module';

import { MailerModule } from '@core/mailer/mailer.module';
import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/core/config/envs.config';
import { LogoutHandler } from '../app/commands/handlers/logout.handler';
import { AuthController } from './http/auth.controller';
import {
  JwtProvider,
  RefreshTokenEntity,
  RefreshTokenProvider,
} from './persistence';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.jwt.secret,
      signOptions: {
        expiresIn: `${envs.jwt.expiresIn}h`,
      },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => TokenModule),
    forwardRef(() => RoleModule),
    forwardRef(() => PermissionModule),
    MailerModule,
    CqrsModule,
    TypeOrmModule.forFeature([RefreshTokenEntity]),
  ],
  controllers: [AuthController],
  providers: [
    JwtProvider,
    JwtStrategy,
    RefreshTokenProvider,
    LoginHandler,
    RefreshHandler,
    LogoutHandler,
    RegisterHandler,
    ForgotPasswordHandler,
    ResetPasswordHandler,
  ],
  exports: [],
})
export class AuthModule {}
