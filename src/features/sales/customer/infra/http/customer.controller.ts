import { Auth, GetTenant, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { Pagination } from '@features/common/interfaces';
import {
  CreateCustomerCommand,
  DeleteCustomerCommand,
  UpdateCustomerCommand,
} from '@features/sales/customer/app/commands';
import {
  FindAllCustomersQuery,
  FindCustomerQuery,
} from '@features/sales/customer/app/queries';
import { Customer } from '@features/sales/customer/domain';
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
  CreateCustomerDto,
  FindAllCustomersDto,
  UpdateCustomerDto,
} from './dto';

@Auth()
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('customers.create')
  async create(@Body() dto: CreateCustomerDto, @GetTenant() tenantId: string) {
    const customer = await this.commandBus.execute<
      CreateCustomerCommand,
      Customer
    >(
      new CreateCustomerCommand(
        dto.name,
        dto.taxId,
        tenantId,
        dto.creditLimit,
        dto.email,
        dto.phone,
        dto.address,
        dto.city,
        dto.state,
        dto.zip,
        dto.country,
      ),
    );
    return Response.success(customer, 'Customer created successfully');
  }

  @Get()
  @Permissions('customers.view')
  async findAll(
    @Query() query: FindAllCustomersDto,
    @GetTenant() tenantId: string,
  ) {
    const result = await this.queryBus.execute<
      FindAllCustomersQuery,
      Pagination<Customer>
    >(
      new FindAllCustomersQuery(
        tenantId,
        query.page,
        query.limit,
        query.search,
      ),
    );
    return Response.success(result.data, '', result.pagination);
  }

  @Get(':id')
  @Permissions('customers.view')
  async findOne(@Param('id') id: string) {
    const customer = await this.queryBus.execute<FindCustomerQuery, Customer>(
      new FindCustomerQuery(id),
    );
    return Response.success(customer);
  }

  @Patch(':id')
  @Permissions('customers.update')
  async update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    const customer = await this.commandBus.execute<
      UpdateCustomerCommand,
      Customer
    >(
      new UpdateCustomerCommand(
        id,
        dto.name,
        dto.taxId,
        dto.creditLimit,
        dto.email,
        dto.phone,
        dto.address,
        dto.city,
        dto.state,
        dto.zip,
        dto.country,
      ),
    );
    return Response.success(customer, 'Customer updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('customers.delete')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute<DeleteCustomerCommand, void>(
      new DeleteCustomerCommand(id),
    );
    return Response.success(null, 'Customer deleted successfully');
  }
}
