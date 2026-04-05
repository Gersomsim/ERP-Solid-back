import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreateSaleTargetCommand,
  DeleteSaleTargetCommand,
  UpdateSaleTargetCommand,
} from '@features/sales/sale-target/app/commands';
import {
  FindAllSaleTargetsQuery,
  FindSaleTargetQuery,
} from '@features/sales/sale-target/app/queries';
import { SaleTarget, SaleTargetView } from '@features/sales/sale-target/domain';
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
  CreateSaleTargetDto,
  FindAllSaleTargetsDto,
  UpdateSaleTargetDto,
} from './dto';

@Auth()
@Controller('sale-targets')
export class SaleTargetController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('sale-targets.create')
  async create(
    @Body() dto: CreateSaleTargetDto,
    @GetTenant() tenantId: string,
  ) {
    const target = await this.commandBus.execute<
      CreateSaleTargetCommand,
      SaleTarget
    >(
      new CreateSaleTargetCommand(
        dto.agentId,
        tenantId,
        dto.periodFrom,
        dto.periodTo,
        dto.targetAmount,
      ),
    );
    return Response.success(target, 'Sale target created successfully');
  }

  @Get()
  @Permissions('sale-targets.view')
  async findAll(
    @Query() query: FindAllSaleTargetsDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllSaleTargetsQuery,
      Pagination<SaleTargetView>
    >(
      new FindAllSaleTargetsQuery(
        tenantId,
        query.page,
        query.limit,
        query.agentId,
      ),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('sale-targets.view')
  async findOne(@Param('id') id: string) {
    const target = await this.queryBus.execute<
      FindSaleTargetQuery,
      SaleTargetView
    >(new FindSaleTargetQuery(id));
    return Response.success(target);
  }

  @Patch(':id')
  @Permissions('sale-targets.update')
  async update(@Param('id') id: string, @Body() dto: UpdateSaleTargetDto) {
    const target = await this.commandBus.execute<
      UpdateSaleTargetCommand,
      SaleTarget
    >(
      new UpdateSaleTargetCommand(
        id,
        dto.agentId,
        dto.periodFrom,
        dto.periodTo,
        dto.targetAmount,
      ),
    );
    return Response.success(target, 'Sale target updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('sale-targets.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteSaleTargetCommand, void>(
      new DeleteSaleTargetCommand(id),
    );
    return Response.success(null, 'Sale target deleted successfully');
  }
}
