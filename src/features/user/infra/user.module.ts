import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [UserProvider],
  exports: [UserProvider, TypeOrmModule],
})
export class UserModule {}
