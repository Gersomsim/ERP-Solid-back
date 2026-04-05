import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './persistence/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
})
export class SaleModule {}
