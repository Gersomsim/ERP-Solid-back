import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ProfileModule {}
