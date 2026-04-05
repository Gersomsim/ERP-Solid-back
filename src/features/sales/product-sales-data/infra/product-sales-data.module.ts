import {
  CreateProductSaleDataHandler,
  DeleteProductSaleDataHandler,
  UpdateProductSaleDataHandler,
} from '@features/sales/product-sales-data/app/commands';
import {
  FindAllProductSaleDataHandler,
  FindProductSaleDataHandler,
} from '@features/sales/product-sales-data/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleDataController } from './http/product-sale-data.controller';
import { ProductSaleData, ProductSaleDataProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSaleData]), CqrsModule],
  controllers: [ProductSaleDataController],
  providers: [
    ProductSaleDataProvider,
    CreateProductSaleDataHandler,
    UpdateProductSaleDataHandler,
    DeleteProductSaleDataHandler,
    FindAllProductSaleDataHandler,
    FindProductSaleDataHandler,
  ],
})
export class ProductSalesDataModule {}
