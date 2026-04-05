import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreateProductSaleDataCommand,
  DeleteProductSaleDataCommand,
  UpdateProductSaleDataCommand,
} from '@features/sales/product-sales-data/app/commands';
import {
  FindAllProductSaleDataQuery,
  FindProductSaleDataQuery,
} from '@features/sales/product-sales-data/app/queries';
import {
  ProductSaleData,
  ProductSaleDataView,
} from '@features/sales/product-sales-data/domain';
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
  CreateProductSaleDataDto,
  FindAllProductSaleDataDto,
  UpdateProductSaleDataDto,
} from './dto';

@Auth()
@Controller('product-sales-data')
export class ProductSaleDataController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('product-sales-data.create')
  async create(
    @Body() dto: CreateProductSaleDataDto,
    @GetTenant() tenantId: string,
  ) {
    const data = await this.commandBus.execute<
      CreateProductSaleDataCommand,
      ProductSaleData
    >(
      new CreateProductSaleDataCommand(
        dto.productId,
        tenantId,
        dto.price,
        dto.taxType,
        dto.isAvailableForSale ?? true,
      ),
    );
    return Response.success(data, 'Product sale data created successfully');
  }

  @Get()
  @Permissions('product-sales-data.view')
  async findAll(
    @Query() query: FindAllProductSaleDataDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllProductSaleDataQuery,
      Pagination<ProductSaleDataView>
    >(
      new FindAllProductSaleDataQuery(
        tenantId,
        query.page,
        query.limit,
        query.search,
        query.isAvailableForSale,
      ),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('product-sales-data.view')
  async findOne(@Param('id') id: string) {
    const view = await this.queryBus.execute<
      FindProductSaleDataQuery,
      ProductSaleDataView
    >(new FindProductSaleDataQuery(id));
    return Response.success(view);
  }

  @Patch(':id')
  @Permissions('product-sales-data.update')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductSaleDataDto,
  ) {
    const data = await this.commandBus.execute<
      UpdateProductSaleDataCommand,
      ProductSaleData
    >(
      new UpdateProductSaleDataCommand(
        id,
        dto.price,
        dto.taxType,
        dto.isAvailableForSale,
      ),
    );
    return Response.success(data, 'Product sale data updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('product-sales-data.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteProductSaleDataCommand, void>(
      new DeleteProductSaleDataCommand(id),
    );
    return Response.success(null, 'Product sale data deleted successfully');
  }
}
