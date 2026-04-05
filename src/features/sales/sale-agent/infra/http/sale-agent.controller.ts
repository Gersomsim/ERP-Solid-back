import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreateSaleAgentCommand,
  DeleteSaleAgentCommand,
  UpdateSaleAgentCommand,
} from '@features/sales/sale-agent/app/commands';
import {
  FindAllSaleAgentsQuery,
  FindSaleAgentQuery,
} from '@features/sales/sale-agent/app/queries';
import { SaleAgent } from '@features/sales/sale-agent/domain';
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
  CreateSaleAgentDto,
  FindAllSaleAgentsDto,
  UpdateSaleAgentDto,
} from './dto';

@Auth()
@Controller('sale-agents')
export class SaleAgentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('sale-agents.create')
  async create(
    @Body() dto: CreateSaleAgentDto,
    @GetTenant() tenantId: string,
  ) {
    const agent = await this.commandBus.execute<
      CreateSaleAgentCommand,
      SaleAgent
    >(
      new CreateSaleAgentCommand(
        dto.name,
        tenantId,
        dto.commissionRate,
        dto.userId,
      ),
    );
    return Response.success(agent, 'Sale agent created successfully');
  }

  @Get()
  @Permissions('sale-agents.view')
  async findAll(
    @Query() query: FindAllSaleAgentsDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllSaleAgentsQuery,
      Pagination<SaleAgent>
    >(
      new FindAllSaleAgentsQuery(
        tenantId,
        query.page,
        query.limit,
        query.search,
      ),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('sale-agents.view')
  async findOne(@Param('id') id: string) {
    const agent = await this.queryBus.execute<FindSaleAgentQuery, SaleAgent>(
      new FindSaleAgentQuery(id),
    );
    return Response.success(agent);
  }

  @Patch(':id')
  @Permissions('sale-agents.update')
  async update(@Param('id') id: string, @Body() dto: UpdateSaleAgentDto) {
    const agent = await this.commandBus.execute<
      UpdateSaleAgentCommand,
      SaleAgent
    >(
      new UpdateSaleAgentCommand(
        id,
        dto.name,
        dto.commissionRate,
        dto.userId,
      ),
    );
    return Response.success(agent, 'Sale agent updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('sale-agents.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteSaleAgentCommand, void>(
      new DeleteSaleAgentCommand(id),
    );
    return Response.success(null, 'Sale agent deleted successfully');
  }
}
