import {
  CreateSaleHandler,
  DeleteSaleHandler,
  UpdateSaleHandler,
} from '@features/sales/sale/app/commands';
import {
  FindAllSalesHandler,
  FindSaleHandler,
} from '@features/sales/sale/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleController } from './http/sale.controller';
import { SaleEntity, SaleProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity]), CqrsModule],
  controllers: [SaleController],
  providers: [
    SaleProvider,
    CreateSaleHandler,
    UpdateSaleHandler,
    DeleteSaleHandler,
    FindAllSalesHandler,
    FindSaleHandler,
  ],
})
export class SaleModule {}
