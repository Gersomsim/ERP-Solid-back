import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidateTokenHandler } from '../app/queries/handlers/validate-token.handler';
import { TokenController } from './http';
import { HashTokenProvider, TokenEntity } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity]), CqrsModule],
  controllers: [TokenController],
  providers: [HashTokenProvider, ValidateTokenHandler],
  exports: [HashTokenProvider],
})
export class TokenModule {}
