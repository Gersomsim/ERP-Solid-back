import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  ApproveSaleReturnCommand,
  CompleteSaleReturnCommand,
  CreateSaleReturnCommand,
  DeleteSaleReturnCommand,
  RejectSaleReturnCommand,
} from '@features/sales/sale-return/app/commands';
import {
  FindAllSaleReturnsQuery,
  FindSaleReturnQuery,
} from '@features/sales/sale-return/app/queries';
import { SaleReturn } from '@features/sales/sale-return/domain';
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
import { CreateSaleReturnDto, FindAllSaleReturnsDto } from './dto';

@Auth()
@Controller('sale-returns')
export class SaleReturnController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('sale-returns.create')
  async create(
    @Body() dto: CreateSaleReturnDto,
    @GetTenant() tenantId: string,
  ) {
    const saleReturn = await this.commandBus.execute<
      CreateSaleReturnCommand,
      SaleReturn
    >(
      new CreateSaleReturnCommand(
        dto.saleId,
        tenantId,
        dto.reason,
        dto.resolutionType,
        dto.notes,
      ),
    );
    return Response.success(saleReturn, 'Sale return created successfully');
  }

  @Get()
  @Permissions('sale-returns.view')
  async findAll(
    @Query() query: FindAllSaleReturnsDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllSaleReturnsQuery,
      Pagination<SaleReturn>
    >(
      new FindAllSaleReturnsQuery(
        tenantId,
        query.page,
        query.limit,
        query.status,
        query.saleId,
      ),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('sale-returns.view')
  async findOne(@Param('id') id: string) {
    const saleReturn = await this.queryBus.execute<
      FindSaleReturnQuery,
      SaleReturn
    >(new FindSaleReturnQuery(id));
    return Response.success(saleReturn);
  }

  @Patch(':id/approve')
  @Permissions('sale-returns.update')
  async approve(@Param('id') id: string) {
    const saleReturn = await this.commandBus.execute<
      ApproveSaleReturnCommand,
      SaleReturn
    >(new ApproveSaleReturnCommand(id));
    return Response.success(saleReturn, 'Sale return approved');
  }

  @Patch(':id/reject')
  @Permissions('sale-returns.update')
  async reject(@Param('id') id: string) {
    const saleReturn = await this.commandBus.execute<
      RejectSaleReturnCommand,
      SaleReturn
    >(new RejectSaleReturnCommand(id));
    return Response.success(saleReturn, 'Sale return rejected');
  }

  @Patch(':id/complete')
  @Permissions('sale-returns.update')
  async complete(@Param('id') id: string) {
    const saleReturn = await this.commandBus.execute<
      CompleteSaleReturnCommand,
      SaleReturn
    >(new CompleteSaleReturnCommand(id));
    return Response.success(saleReturn, 'Sale return completed');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('sale-returns.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteSaleReturnCommand, void>(
      new DeleteSaleReturnCommand(id),
    );
    return Response.success(null, 'Sale return deleted successfully');
  }
}
