import {
  CreateCommissionPaymentHandler,
  DeleteCommissionPaymentHandler,
  PayCommissionPaymentHandler,
} from '@features/sales/commission-payment/app/commands';
import {
  FindAllCommissionPaymentsHandler,
  FindCommissionPaymentHandler,
} from '@features/sales/commission-payment/app/queries';
import { CommissionEntity, CommissionProvider } from '@features/sales/commission/infra/persistence';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommissionPaymentController } from './http/commission-payment.controller';
import { CommissionPaymentEntity, CommissionPaymentProvider } from './persistence';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommissionPaymentEntity, CommissionEntity]),
    CqrsModule,
  ],
  controllers: [CommissionPaymentController],
  providers: [
    CommissionPaymentProvider,
    CommissionProvider,
    CreateCommissionPaymentHandler,
    PayCommissionPaymentHandler,
    DeleteCommissionPaymentHandler,
    FindAllCommissionPaymentsHandler,
    FindCommissionPaymentHandler,
  ],
})
export class CommissionPaymentModule {}
