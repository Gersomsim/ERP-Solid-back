import {
  CreatePriceListItemHandler,
  DeletePriceListItemHandler,
  UpdatePriceListItemHandler,
} from '@features/sales/price-list-item/app/commands';
import {
  FindAllPriceListItemsHandler,
  FindPriceListItemHandler,
} from '@features/sales/price-list-item/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceListItemController } from './http/price-list-item.controller';
import { PriceListItemEntity, PriceListItemProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([PriceListItemEntity]), CqrsModule],
  controllers: [PriceListItemController],
  providers: [
    PriceListItemProvider,
    CreatePriceListItemHandler,
    UpdatePriceListItemHandler,
    DeletePriceListItemHandler,
    FindAllPriceListItemsHandler,
    FindPriceListItemHandler,
  ],
})
export class PriceListItemModule {}
