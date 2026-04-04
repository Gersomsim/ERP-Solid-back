import { LoginHandler, RefreshHandler } from '@features/auth/app/commands';
import { UserModule } from '@features/user/infra/user.module';
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
  ],
  exports: [],
})
export class AuthModule {}
