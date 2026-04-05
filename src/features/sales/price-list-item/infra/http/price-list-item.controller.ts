import { Auth, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreatePriceListItemCommand,
  DeletePriceListItemCommand,
  UpdatePriceListItemCommand,
} from '@features/sales/price-list-item/app/commands';
import {
  FindAllPriceListItemsQuery,
  FindPriceListItemQuery,
} from '@features/sales/price-list-item/app/queries';
import { PriceListItem, PriceListItemView } from '@features/sales/price-list-item/domain';
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
  CreatePriceListItemDto,
  FindAllPriceListItemsDto,
  UpdatePriceListItemDto,
} from './dto';

@Auth()
@Controller('price-lists/:priceListId/items')
export class PriceListItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('price-list-items.create')
  async create(
    @Param('priceListId') priceListId: string,
    @Body() dto: CreatePriceListItemDto,
  ) {
    const item = await this.commandBus.execute<
      CreatePriceListItemCommand,
      PriceListItem
    >(
      new CreatePriceListItemCommand(
        priceListId,
        dto.productSaleDataId,
        dto.price,
        dto.minQuantity ?? 1,
      ),
    );
    return Response.success(item, 'Price list item created successfully');
  }

  @Get()
  @Permissions('price-list-items.view')
  async findAll(
    @Param('priceListId') priceListId: string,
    @Query() query: FindAllPriceListItemsDto,
  ) {
    const result = await this.queryBus.execute<
      FindAllPriceListItemsQuery,
      Pagination<PriceListItemView>
    >(
      new FindAllPriceListItemsQuery(
        priceListId,
        query.page,
        query.limit,
        query.search,
      ),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('price-list-items.view')
  async findOne(@Param('id') id: string) {
    const view = await this.queryBus.execute<
      FindPriceListItemQuery,
      PriceListItemView
    >(new FindPriceListItemQuery(id));
    return Response.success(view);
  }

  @Patch(':id')
  @Permissions('price-list-items.update')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePriceListItemDto,
  ) {
    const item = await this.commandBus.execute<
      UpdatePriceListItemCommand,
      PriceListItem
    >(new UpdatePriceListItemCommand(id, dto.price, dto.minQuantity));
    return Response.success(item, 'Price list item updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('price-list-items.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeletePriceListItemCommand, void>(
      new DeletePriceListItemCommand(id),
    );
    return Response.success(null, 'Price list item deleted successfully');
  }
}
