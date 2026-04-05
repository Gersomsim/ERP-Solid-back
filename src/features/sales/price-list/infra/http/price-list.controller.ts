import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreatePriceListCommand,
  DeletePriceListCommand,
  UpdatePriceListCommand,
} from '@features/sales/price-list/app/commands';
import {
  FindAllPriceListsQuery,
  FindPriceListQuery,
} from '@features/sales/price-list/app/queries';
import { PriceList } from '@features/sales/price-list/domain';
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
  CreatePriceListDto,
  FindAllPriceListsDto,
  UpdatePriceListDto,
} from './dto';

@Auth()
@Controller('price-lists')
export class PriceListController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('price-lists.create')
  async create(
    @Body() dto: CreatePriceListDto,
    @GetTenant() tenantId: string,
  ) {
    const priceList = await this.commandBus.execute<
      CreatePriceListCommand,
      PriceList
    >(
      new CreatePriceListCommand(
        dto.name,
        tenantId,
        dto.isDefault ?? false,
        dto.validFrom ? new Date(dto.validFrom) : null,
        dto.validTo ? new Date(dto.validTo) : null,
      ),
    );
    return Response.success(priceList, 'Price list created successfully');
  }

  @Get()
  @Permissions('price-lists.view')
  async findAll(
    @Query() query: FindAllPriceListsDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllPriceListsQuery,
      Pagination<PriceList>
    >(new FindAllPriceListsQuery(tenantId, query.page, query.limit, query.search));
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('price-lists.view')
  async findOne(@Param('id') id: string) {
    const priceList = await this.queryBus.execute<FindPriceListQuery, PriceList>(
      new FindPriceListQuery(id),
    );
    return Response.success(priceList);
  }

  @Patch(':id')
  @Permissions('price-lists.update')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePriceListDto,
  ) {
    const priceList = await this.commandBus.execute<
      UpdatePriceListCommand,
      PriceList
    >(
      new UpdatePriceListCommand(
        id,
        dto.name,
        dto.isDefault,
        dto.validFrom ? new Date(dto.validFrom) : undefined,
        dto.validTo ? new Date(dto.validTo) : undefined,
      ),
    );
    return Response.success(priceList, 'Price list updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('price-lists.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeletePriceListCommand, void>(
      new DeletePriceListCommand(id),
    );
    return Response.success(null, 'Price list deleted successfully');
  }
}
