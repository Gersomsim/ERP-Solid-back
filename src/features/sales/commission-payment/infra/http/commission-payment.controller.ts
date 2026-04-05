import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreateCommissionPaymentCommand,
  DeleteCommissionPaymentCommand,
  PayCommissionPaymentCommand,
} from '@features/sales/commission-payment/app/commands';
import {
  FindAllCommissionPaymentsQuery,
  FindCommissionPaymentQuery,
} from '@features/sales/commission-payment/app/queries';
import { CommissionPayment } from '@features/sales/commission-payment/domain';
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
  CreateCommissionPaymentDto,
  FindAllCommissionPaymentsDto,
} from './dto';

@Auth()
@Controller('commission-payments')
export class CommissionPaymentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('commission-payments.create')
  async create(
    @Body() dto: CreateCommissionPaymentDto,
    @GetTenant() tenantId: string,
  ) {
    const payment = await this.commandBus.execute<
      CreateCommissionPaymentCommand,
      CommissionPayment
    >(
      new CreateCommissionPaymentCommand(
        dto.agentId,
        tenantId,
        new Date(dto.periodFrom),
        new Date(dto.periodTo),
      ),
    );
    return Response.success(payment, 'Commission payment created successfully');
  }

  @Get()
  @Permissions('commission-payments.view')
  async findAll(
    @Query() query: FindAllCommissionPaymentsDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllCommissionPaymentsQuery,
      Pagination<CommissionPayment>
    >(
      new FindAllCommissionPaymentsQuery(
        tenantId,
        query.page,
        query.limit,
        query.agentId,
      ),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('commission-payments.view')
  async findOne(@Param('id') id: string) {
    const payment = await this.queryBus.execute<
      FindCommissionPaymentQuery,
      CommissionPayment
    >(new FindCommissionPaymentQuery(id));
    return Response.success(payment);
  }

  @Patch(':id/pay')
  @Permissions('commission-payments.update')
  async pay(@Param('id') id: string) {
    const payment = await this.commandBus.execute<
      PayCommissionPaymentCommand,
      CommissionPayment
    >(new PayCommissionPaymentCommand(id));
    return Response.success(payment, 'Commission payment marked as paid');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('commission-payments.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteCommissionPaymentCommand, void>(
      new DeleteCommissionPaymentCommand(id),
    );
    return Response.success(null, 'Commission payment deleted successfully');
  }
}
