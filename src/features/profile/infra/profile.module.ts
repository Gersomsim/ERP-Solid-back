import { UpdateProfileHandler } from '@features/profile/app/commands';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './http/profile.controller';
import { ProfileEntity, ProfileProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity]), CqrsModule],
  controllers: [ProfileController],
  providers: [ProfileProvider, UpdateProfileHandler],
  exports: [TypeOrmModule],
})
export class ProfileModule {}
