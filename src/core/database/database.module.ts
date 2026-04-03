import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '../config/envs.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envs.db.conexion,
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
