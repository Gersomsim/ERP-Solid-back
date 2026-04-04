import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ChangePasswordHandler,
  CreateUserHandler,
  UpdateUserHandler,
} from '../app/commands';
import { FindAllUsersHandler } from '../app/queries/handlers/find-all-users.handler';
import { UserController } from './http/user.controller';
import { UserEntity, UserProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  controllers: [UserController],
  providers: [
    UserProvider,
    ChangePasswordHandler,
    CreateUserHandler,
    FindAllUsersHandler,
    UpdateUserHandler,
  ],
  exports: [UserProvider, TypeOrmModule],
})
export class UserModule {}
