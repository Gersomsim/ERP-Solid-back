import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '../config/envs.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envs.db.conexion,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {
  constructor() {
    console.log(envs.db.conexion);
  }
}
