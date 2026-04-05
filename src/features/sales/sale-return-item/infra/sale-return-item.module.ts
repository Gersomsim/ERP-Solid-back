import {
  CreateSaleReturnItemHandler,
  DeleteSaleReturnItemHandler,
} from '@features/sales/sale-return-item/app/commands';
import {
  FindAllSaleReturnItemsHandler,
  FindSaleReturnItemHandler,
} from '@features/sales/sale-return-item/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleReturnItemController } from './http/sale-return-item.controller';
import { SaleReturnItemEntity, SaleReturnItemProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([SaleReturnItemEntity]), CqrsModule],
  controllers: [SaleReturnItemController],
  providers: [
    SaleReturnItemProvider,
    CreateSaleReturnItemHandler,
    DeleteSaleReturnItemHandler,
    FindAllSaleReturnItemsHandler,
    FindSaleReturnItemHandler,
  ],
})
export class SaleReturnItemModule {}
