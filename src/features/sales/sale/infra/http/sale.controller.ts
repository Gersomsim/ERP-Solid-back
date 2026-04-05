import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  ConfirmSaleCommand,
  CreateSaleCommand,
  DeleteSaleCommand,
  UpdateSaleCommand,
} from '@features/sales/sale/app/commands';
import {
  FindAllSalesQuery,
  FindSaleQuery,
} from '@features/sales/sale/app/queries';
import { Sale } from '@features/sales/sale/domain';
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
import { CreateSaleDto, FindAllSalesDto, UpdateSaleDto } from './dto';

@Auth()
@Controller('sales')
export class SaleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('sales.create')
  async create(@Body() dto: CreateSaleDto, @GetTenant() tenantId: string) {
    const sale = await this.commandBus.execute<CreateSaleCommand, Sale>(
      new CreateSaleCommand(
        tenantId,
        dto.customerId,
        dto.saleAgentId,
        dto.folio,
        new Date(dto.saleDate),
        dto.subtotal,
        dto.tax,
        dto.discount,
        dto.total,
        dto.paymentTermId,
      ),
    );
    return Response.success(sale, 'Sale created successfully');
  }

  @Get()
  @Permissions('sales.view')
  async findAll(
    @Query() query: FindAllSalesDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllSalesQuery,
      Pagination<Sale>
    >(
      new FindAllSalesQuery(
        tenantId,
        query.page,
        query.limit,
        query.search,
        query.status,
        query.customerId,
        query.saleAgentId,
      ),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('sales.view')
  async findOne(@Param('id') id: string) {
    const sale = await this.queryBus.execute<FindSaleQuery, Sale>(
      new FindSaleQuery(id),
    );
    return Response.success(sale);
  }

  @Patch(':id')
  @Permissions('sales.update')
  async update(@Param('id') id: string, @Body() dto: UpdateSaleDto) {
    const sale = await this.commandBus.execute<UpdateSaleCommand, Sale>(
      new UpdateSaleCommand(
        id,
        dto.customerId,
        dto.saleAgentId,
        dto.folio,
        dto.saleDate ? new Date(dto.saleDate) : undefined,
        dto.subtotal,
        dto.tax,
        dto.discount,
        dto.total,
        dto.status,
        dto.paymentTermId,
      ),
    );
    return Response.success(sale, 'Sale updated successfully');
  }

  @Patch(':id/confirm')
  @Permissions('sales.update')
  async confirm(@Param('id') id: string) {
    const sale = await this.commandBus.execute<ConfirmSaleCommand, Sale>(
      new ConfirmSaleCommand(id),
    );
    return Response.success(sale, 'Sale confirmed successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('sales.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteSaleCommand, void>(
      new DeleteSaleCommand(id),
    );
    return Response.success(null, 'Sale deleted successfully');
  }
}
