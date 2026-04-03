import { UserModule } from '@features/user/infra/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/core/config/envs.config';
import { AuthController } from './http/auth.controller';
import { JwtProvider } from './persistence';
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
  ],
  controllers: [AuthController],
  providers: [JwtProvider, JwtStrategy],
  exports: [],
})
export class AuthModule {}
