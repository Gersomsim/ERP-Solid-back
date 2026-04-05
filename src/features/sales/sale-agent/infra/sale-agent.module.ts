import {
  CreateSaleAgentHandler,
  DeleteSaleAgentHandler,
  UpdateSaleAgentHandler,
} from '@features/sales/sale-agent/app/commands';
import {
  FindAllSaleAgentsHandler,
  FindSaleAgentHandler,
} from '@features/sales/sale-agent/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleAgentController } from './http/sale-agent.controller';
import { SaleAgentEntity, SaleAgentProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([SaleAgentEntity]), CqrsModule],
  controllers: [SaleAgentController],
  providers: [
    SaleAgentProvider,
    CreateSaleAgentHandler,
    UpdateSaleAgentHandler,
    DeleteSaleAgentHandler,
    FindAllSaleAgentsHandler,
    FindSaleAgentHandler,
  ],
})
export class SaleAgentModule {}
