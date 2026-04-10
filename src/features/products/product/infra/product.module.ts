import {
  CreateProductHandler,
  DeleteProductHandler,
  UpdateProductHandler,
} from '@features/products/product/app/commands';
import {
  FindAllProductsHandler,
  FindProductHandler,
} from '@features/products/product/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './http/product.controller';
import { ProductEntity, ProductProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CqrsModule],
  controllers: [ProductController],
  providers: [
    ProductProvider,
    CreateProductHandler,
    UpdateProductHandler,
    DeleteProductHandler,
    FindAllProductsHandler,
    FindProductHandler,
  ],
})
export class ProductModule {}
