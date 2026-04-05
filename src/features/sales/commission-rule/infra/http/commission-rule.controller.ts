import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreateCommissionRuleCommand,
  DeleteCommissionRuleCommand,
  UpdateCommissionRuleCommand,
} from '@features/sales/commission-rule/app/commands';
import {
  FindAllCommissionRulesQuery,
  FindCommissionRuleQuery,
} from '@features/sales/commission-rule/app/queries';
import { CommissionRule } from '@features/sales/commission-rule/domain';
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
  CreateCommissionRuleDto,
  FindAllCommissionRulesDto,
  UpdateCommissionRuleDto,
} from './dto';

@Auth()
@Controller('commission-rules')
export class CommissionRuleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('commission-rules.create')
  async create(
    @Body() dto: CreateCommissionRuleDto,
    @GetTenant() tenantId: string,
  ) {
    const rule = await this.commandBus.execute<
      CreateCommissionRuleCommand,
      CommissionRule
    >(new CreateCommissionRuleCommand(dto.agentId, tenantId, dto.percentage));
    return Response.success(rule, 'Commission rule created successfully');
  }

  @Get()
  @Permissions('commission-rules.view')
  async findAll(
    @Query() query: FindAllCommissionRulesDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllCommissionRulesQuery,
      Pagination<CommissionRule>
    >(
      new FindAllCommissionRulesQuery(
        tenantId,
        query.page,
        query.limit,
        query.agentId,
      ),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('commission-rules.view')
  async findOne(@Param('id') id: string) {
    const rule = await this.queryBus.execute<
      FindCommissionRuleQuery,
      CommissionRule
    >(new FindCommissionRuleQuery(id));
    return Response.success(rule);
  }

  @Patch(':id')
  @Permissions('commission-rules.update')
  async update(@Param('id') id: string, @Body() dto: UpdateCommissionRuleDto) {
    const rule = await this.commandBus.execute<
      UpdateCommissionRuleCommand,
      CommissionRule
    >(new UpdateCommissionRuleCommand(id, dto.percentage, dto.isActive));
    return Response.success(rule, 'Commission rule updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('commission-rules.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteCommissionRuleCommand, void>(
      new DeleteCommissionRuleCommand(id),
    );
    return Response.success(null, 'Commission rule deleted successfully');
  }
}
