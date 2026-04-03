import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/core/config/envs.config';
import { AuthController } from './http/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.jwt.secret,
      signOptions: {
        expiresIn: `${envs.jwt.expiresIn}h`,
      },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
