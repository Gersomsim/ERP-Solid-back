import {
  CreatePaymentTermHandler,
  DeletePaymentTermHandler,
  UpdatePaymentTermHandler,
} from '@features/sales/payment-term/app/commands';
import {
  FindAllPaymentTermsHandler,
  FindPaymentTermHandler,
} from '@features/sales/payment-term/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTermController } from './http/payment-term.controller';
import { PaymentTermEntity, PaymentTermProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentTermEntity]), CqrsModule],
  controllers: [PaymentTermController],
  providers: [
    PaymentTermProvider,
    CreatePaymentTermHandler,
    UpdatePaymentTermHandler,
    DeletePaymentTermHandler,
    FindAllPaymentTermsHandler,
    FindPaymentTermHandler,
  ],
})
export class PaymentTermModule {}
