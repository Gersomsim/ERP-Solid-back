import {
  ApproveSaleReturnHandler,
  CompleteSaleReturnHandler,
  CreateSaleReturnHandler,
  DeleteSaleReturnHandler,
  RejectSaleReturnHandler,
} from '@features/sales/sale-return/app/commands';
import {
  FindAllSaleReturnsHandler,
  FindSaleReturnHandler,
} from '@features/sales/sale-return/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleReturnController } from './http/sale-return.controller';
import { SaleReturnEntity, SaleReturnProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([SaleReturnEntity]), CqrsModule],
  controllers: [SaleReturnController],
  providers: [
    SaleReturnProvider,
    CreateSaleReturnHandler,
    ApproveSaleReturnHandler,
    RejectSaleReturnHandler,
    CompleteSaleReturnHandler,
    DeleteSaleReturnHandler,
    FindAllSaleReturnsHandler,
    FindSaleReturnHandler,
  ],
})
export class SaleReturnModule {}
