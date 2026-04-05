import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreatePaymentTermCommand,
  DeletePaymentTermCommand,
  UpdatePaymentTermCommand,
} from '@features/sales/payment-term/app/commands';
import {
  FindAllPaymentTermsQuery,
  FindPaymentTermQuery,
} from '@features/sales/payment-term/app/queries';
import { PaymentTerm } from '@features/sales/payment-term/domain';
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
  CreatePaymentTermDto,
  FindAllPaymentTermsDto,
  UpdatePaymentTermDto,
} from './dto';

@Auth()
@Controller('payment-terms')
export class PaymentTermController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('payment-terms.create')
  async create(
    @Body() dto: CreatePaymentTermDto,
    @GetTenant() tenantId: string,
  ) {
    const term = await this.commandBus.execute<
      CreatePaymentTermCommand,
      PaymentTerm
    >(
      new CreatePaymentTermCommand(
        tenantId,
        dto.name,
        dto.days,
        dto.description,
      ),
    );
    return Response.success(term, 'Payment term created successfully');
  }

  @Get()
  @Permissions('payment-terms.view')
  async findAll(
    @Query() query: FindAllPaymentTermsDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllPaymentTermsQuery,
      Pagination<PaymentTerm>
    >(
      new FindAllPaymentTermsQuery(
        tenantId,
        query.page,
        query.limit,
        query.search,
      ),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('payment-terms.view')
  async findOne(@Param('id') id: string) {
    const term = await this.queryBus.execute<FindPaymentTermQuery, PaymentTerm>(
      new FindPaymentTermQuery(id),
    );
    return Response.success(term);
  }

  @Patch(':id')
  @Permissions('payment-terms.update')
  async update(@Param('id') id: string, @Body() dto: UpdatePaymentTermDto) {
    const term = await this.commandBus.execute<
      UpdatePaymentTermCommand,
      PaymentTerm
    >(
      new UpdatePaymentTermCommand(
        id,
        dto.name,
        dto.days,
        dto.description,
        dto.isActive,
      ),
    );
    return Response.success(term, 'Payment term updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('payment-terms.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeletePaymentTermCommand, void>(
      new DeletePaymentTermCommand(id),
    );
    return Response.success(null, 'Payment term deleted successfully');
  }
}
