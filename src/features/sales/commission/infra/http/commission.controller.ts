import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  ApproveCommissionCommand,
  CancelCommissionCommand,
} from '@features/sales/commission/app/commands';
import {
  FindAllCommissionsQuery,
  FindCommissionQuery,
} from '@features/sales/commission/app/queries';
import { Commission } from '@features/sales/commission/domain';
import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindAllCommissionsDto } from './dto';

@Auth()
@Controller('commissions')
export class CommissionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @Permissions('commissions.view')
  async findAll(
    @Query() query: FindAllCommissionsDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllCommissionsQuery,
      Pagination<Commission>
    >(
      new FindAllCommissionsQuery(
        tenantId,
        query.page,
        query.limit,
        query.status,
        query.agentId,
        query.saleId,
      ),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('commissions.view')
  async findOne(@Param('id') id: string) {
    const commission = await this.queryBus.execute<
      FindCommissionQuery,
      Commission
    >(new FindCommissionQuery(id));
    return Response.success(commission);
  }

  @Patch(':id/approve')
  @Permissions('commissions.update')
  async approve(@Param('id') id: string) {
    const commission = await this.commandBus.execute<
      ApproveCommissionCommand,
      Commission
    >(new ApproveCommissionCommand(id));
    return Response.success(commission, 'Commission approved');
  }

  @Patch(':id/cancel')
  @Permissions('commissions.update')
  async cancel(@Param('id') id: string) {
    const commission = await this.commandBus.execute<
      CancelCommissionCommand,
      Commission
    >(new CancelCommissionCommand(id));
    return Response.success(commission, 'Commission cancelled');
  }
}
