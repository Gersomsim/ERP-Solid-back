import { Auth, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreateSaleItemCommand,
  DeleteSaleItemCommand,
  UpdateSaleItemCommand,
} from '@features/sales/sale-item/app/commands';
import {
  FindAllSaleItemsQuery,
  FindSaleItemQuery,
} from '@features/sales/sale-item/app/queries';
import { SaleItem } from '@features/sales/sale-item/domain';
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
import { CreateSaleItemDto, FindAllSaleItemsDto, UpdateSaleItemDto } from './dto';

@Auth()
@Controller('sale-items')
export class SaleItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('sale-items.create')
  async create(@Body() dto: CreateSaleItemDto) {
    const item = await this.commandBus.execute<CreateSaleItemCommand, SaleItem>(
      new CreateSaleItemCommand(
        dto.saleId,
        dto.productId,
        dto.quantity,
        dto.unitPrice,
        dto.tax,
        dto.discount,
        dto.total,
      ),
    );
    return Response.success(item, 'Sale item created successfully');
  }

  @Get()
  @Permissions('sale-items.view')
  async findAll(@Query() query: FindAllSaleItemsDto) {
    const result = await this.queryBus.execute<
      FindAllSaleItemsQuery,
      Pagination<SaleItem>
    >(new FindAllSaleItemsQuery(query.saleId, query.page, query.limit));
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('sale-items.view')
  async findOne(@Param('id') id: string) {
    const item = await this.queryBus.execute<FindSaleItemQuery, SaleItem>(
      new FindSaleItemQuery(id),
    );
    return Response.success(item);
  }

  @Patch(':id')
  @Permissions('sale-items.update')
  async update(@Param('id') id: string, @Body() dto: UpdateSaleItemDto) {
    const item = await this.commandBus.execute<UpdateSaleItemCommand, SaleItem>(
      new UpdateSaleItemCommand(
        id,
        dto.quantity,
        dto.unitPrice,
        dto.tax,
        dto.discount,
        dto.total,
      ),
    );
    return Response.success(item, 'Sale item updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('sale-items.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteSaleItemCommand, void>(
      new DeleteSaleItemCommand(id),
    );
    return Response.success(null, 'Sale item deleted successfully');
  }
}
