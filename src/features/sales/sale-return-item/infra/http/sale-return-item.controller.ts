import { Auth, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreateSaleReturnItemCommand,
  DeleteSaleReturnItemCommand,
} from '@features/sales/sale-return-item/app/commands';
import {
  FindAllSaleReturnItemsQuery,
  FindSaleReturnItemQuery,
} from '@features/sales/sale-return-item/app/queries';
import { SaleReturnItem } from '@features/sales/sale-return-item/domain';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateSaleReturnItemDto,
  FindAllSaleReturnItemsDto,
} from './dto';

@Auth()
@Controller('sale-returns/:saleReturnId/items')
export class SaleReturnItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('sale-return-items.create')
  async create(
    @Param('saleReturnId') saleReturnId: string,
    @Body() dto: CreateSaleReturnItemDto,
  ) {
    const item = await this.commandBus.execute<
      CreateSaleReturnItemCommand,
      SaleReturnItem
    >(
      new CreateSaleReturnItemCommand(
        saleReturnId,
        dto.saleItemId,
        dto.productId,
        dto.quantity,
        dto.unitPrice,
      ),
    );
    return Response.success(item, 'Sale return item created successfully');
  }

  @Get()
  @Permissions('sale-return-items.view')
  async findAll(
    @Param('saleReturnId') saleReturnId: string,
    @Query() query: FindAllSaleReturnItemsDto,
  ) {
    const result = await this.queryBus.execute<
      FindAllSaleReturnItemsQuery,
      Pagination<SaleReturnItem>
    >(
      new FindAllSaleReturnItemsQuery(saleReturnId, query.page, query.limit),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('sale-return-items.view')
  async findOne(@Param('id') id: string) {
    const item = await this.queryBus.execute<
      FindSaleReturnItemQuery,
      SaleReturnItem
    >(new FindSaleReturnItemQuery(id));
    return Response.success(item);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('sale-return-items.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteSaleReturnItemCommand, void>(
      new DeleteSaleReturnItemCommand(id),
    );
    return Response.success(null, 'Sale return item deleted successfully');
  }
}
