import {
  CreatePriceListHandler,
  DeletePriceListHandler,
  UpdatePriceListHandler,
} from '@features/sales/price-list/app/commands';
import {
  FindAllPriceListsHandler,
  FindPriceListHandler,
} from '@features/sales/price-list/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceListController } from './http/price-list.controller';
import { PriceListEntity, PriceListProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([PriceListEntity]), CqrsModule],
  controllers: [PriceListController],
  providers: [
    PriceListProvider,
    CreatePriceListHandler,
    UpdatePriceListHandler,
    DeletePriceListHandler,
    FindAllPriceListsHandler,
    FindPriceListHandler,
  ],
})
export class PriceListModule {}
