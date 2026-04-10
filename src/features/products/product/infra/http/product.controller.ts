import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreateProductCommand,
  DeleteProductCommand,
  UpdateProductCommand,
} from '@features/products/product/app/commands';
import {
  FindAllProductsQuery,
  FindProductQuery,
} from '@features/products/product/app/queries';
import { Product } from '@features/products/product/domain';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateProductDto,
  FindAllProductsDto,
  UpdateProductDto,
} from './dto';

@Auth()
@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('products.create')
  async create(@Body() dto: CreateProductDto, @GetTenant() tenantId: string) {
    const product = await this.commandBus.execute<CreateProductCommand, Product>(
      new CreateProductCommand(
        dto.name,
        dto.sku,
        tenantId,
        dto.description,
        dto.active,
        dto.storable,
        dto.sellable,
        dto.buyable,
        dto.service,
      ),
    );
    return Response.success(product, 'Product created successfully');
  }

  @Get()
  @Permissions('products.view')
  async findAll(
    @Query() query: FindAllProductsDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllProductsQuery,
      Pagination<Product>
    >(new FindAllProductsQuery(tenantId, query.page, query.limit, query.search));
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('products.view')
  async findOne(@Param('id') id: string) {
    const product = await this.queryBus.execute<FindProductQuery, Product>(
      new FindProductQuery(id),
    );
    return Response.success(product);
  }

  @Patch(':id')
  @Permissions('products.update')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const product = await this.commandBus.execute<UpdateProductCommand, Product>(
      new UpdateProductCommand(
        id,
        dto.name,
        dto.sku,
        dto.description,
        dto.active,
        dto.storable,
        dto.sellable,
        dto.buyable,
        dto.service,
      ),
    );
    return Response.success(product, 'Product updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('products.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteProductCommand, void>(
      new DeleteProductCommand(id),
    );
    return Response.success(null, 'Product deleted successfully');
  }
}
