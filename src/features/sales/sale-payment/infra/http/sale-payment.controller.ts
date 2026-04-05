import { Auth, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreateSalePaymentCommand,
  DeleteSalePaymentCommand,
  UpdateSalePaymentCommand,
} from '@features/sales/sale-payment/app/commands';
import {
  FindAllSalePaymentsQuery,
  FindSalePaymentQuery,
} from '@features/sales/sale-payment/app/queries';
import { SalePayment } from '@features/sales/sale-payment/domain';
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
  CreateSalePaymentDto,
  FindAllSalePaymentsDto,
  UpdateSalePaymentDto,
} from './dto';

@Auth()
@Controller('sale-payments')
export class SalePaymentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('sale-payments.create')
  async create(@Body() dto: CreateSalePaymentDto) {
    const payment = await this.commandBus.execute<
      CreateSalePaymentCommand,
      SalePayment
    >(
      new CreateSalePaymentCommand(
        dto.saleId,
        dto.amount,
        new Date(dto.date),
        dto.reference,
        dto.paymentMethodId,
      ),
    );
    return Response.success(payment, 'Sale payment created successfully');
  }

  @Get()
  @Permissions('sale-payments.view')
  async findAll(@Query() query: FindAllSalePaymentsDto) {
    const result = await this.queryBus.execute<
      FindAllSalePaymentsQuery,
      Pagination<SalePayment>
    >(new FindAllSalePaymentsQuery(query.saleId, query.page, query.limit));
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('sale-payments.view')
  async findOne(@Param('id') id: string) {
    const payment = await this.queryBus.execute<
      FindSalePaymentQuery,
      SalePayment
    >(new FindSalePaymentQuery(id));
    return Response.success(payment);
  }

  @Patch(':id')
  @Permissions('sale-payments.update')
  async update(@Param('id') id: string, @Body() dto: UpdateSalePaymentDto) {
    const payment = await this.commandBus.execute<
      UpdateSalePaymentCommand,
      SalePayment
    >(
      new UpdateSalePaymentCommand(
        id,
        dto.amount,
        dto.date ? new Date(dto.date) : undefined,
        dto.reference,
        dto.paymentMethodId,
      ),
    );
    return Response.success(payment, 'Sale payment updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('sale-payments.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteSalePaymentCommand, void>(
      new DeleteSalePaymentCommand(id),
    );
    return Response.success(null, 'Sale payment deleted successfully');
  }
}
