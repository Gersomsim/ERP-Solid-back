import {
  CreateSaleTargetHandler,
  DeleteSaleTargetHandler,
  UpdateSaleTargetHandler,
} from '@features/sales/sale-target/app/commands';
import {
  FindAllSaleTargetsHandler,
  FindSaleTargetHandler,
} from '@features/sales/sale-target/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleTargetController } from './http/sale-target.controller';
import { SaleTargetEntity, SaleTargetProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([SaleTargetEntity]), CqrsModule],
  controllers: [SaleTargetController],
  providers: [
    SaleTargetProvider,
    CreateSaleTargetHandler,
    UpdateSaleTargetHandler,
    DeleteSaleTargetHandler,
    FindAllSaleTargetsHandler,
    FindSaleTargetHandler,
  ],
})
export class SaleTargetModule {}
