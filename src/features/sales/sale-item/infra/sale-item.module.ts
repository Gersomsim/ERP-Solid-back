import {
  CreateSaleItemHandler,
  DeleteSaleItemHandler,
  UpdateSaleItemHandler,
} from '@features/sales/sale-item/app/commands';
import {
  FindAllSaleItemsHandler,
  FindSaleItemHandler,
} from '@features/sales/sale-item/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleItemController } from './infra/http/sale-item.controller';
import { SaleItem, SaleItemProvider } from './infra/persistence';

@Module({
  imports: [TypeOrmModule.forFeature([SaleItem]), CqrsModule],
  controllers: [SaleItemController],
  providers: [
    SaleItemProvider,
    CreateSaleItemHandler,
    UpdateSaleItemHandler,
    DeleteSaleItemHandler,
    FindAllSaleItemsHandler,
    FindSaleItemHandler,
  ],
})
export class SaleItemModule {}
