import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodEntity } from './persistence/payment-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethodEntity])],
  exports: [TypeOrmModule],
})
export class PaymentMethodModule {}
