import {
  CreateSalePaymentHandler,
  DeleteSalePaymentHandler,
  UpdateSalePaymentHandler,
} from '@features/sales/sale-payment/app/commands';
import {
  FindAllSalePaymentsHandler,
  FindSalePaymentHandler,
} from '@features/sales/sale-payment/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalePaymentController } from './http/sale-payment.controller';
import { SalePaymentEntity, SalePaymentProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([SalePaymentEntity]), CqrsModule],
  controllers: [SalePaymentController],
  providers: [
    SalePaymentProvider,
    CreateSalePaymentHandler,
    UpdateSalePaymentHandler,
    DeleteSalePaymentHandler,
    FindAllSalePaymentsHandler,
    FindSalePaymentHandler,
  ],
  exports: [TypeOrmModule],
})
export class SalePaymentModule {}
