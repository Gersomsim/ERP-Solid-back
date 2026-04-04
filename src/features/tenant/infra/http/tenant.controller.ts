import { Auth, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import {
  CreateTenantCommand,
  UpdateTenantCommand,
  UpdateTenantSettingsCommand,
} from '@features/tenant/app/commands';
import { FindTenantQuery } from '@features/tenant/app/queries';
import { Tenant } from '@features/tenant/domain';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTenantDto,
  UpdateTenantDto,
  UpdateTenantSettingsDto,
} from './dto';

@Controller('tenants')
export class TenantController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateTenantDto) {
    const tenant = await this.commandBus.execute<CreateTenantCommand, Tenant>(
      new CreateTenantCommand(dto.name, dto.slug, dto.taxIdentifier),
    );
    return Response.success(tenant, 'Tenant created successfully');
  }

  @Auth()
  @Get(':id')
  @Permissions('tenants.view')
  async findOne(@Param('id') id: string) {
    const tenant = await this.queryBus.execute<FindTenantQuery, Tenant>(
      new FindTenantQuery(id),
    );
    return Response.success(tenant);
  }

  @Auth()
  @Patch(':id')
  @Permissions('tenants.update')
  async update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    const tenant = await this.commandBus.execute<UpdateTenantCommand, Tenant>(
      new UpdateTenantCommand(
        id,
        dto.name,
        dto.slug,
        dto.taxIdentifier,
        dto.status,
      ),
    );
    return Response.success(tenant, 'Tenant updated successfully');
  }

  @Auth()
  @Patch(':id/settings')
  @Permissions('tenants.settings')
  async updateSettings(
    @Param('id') id: string,
    @Body() dto: UpdateTenantSettingsDto,
  ) {
    const tenant = await this.commandBus.execute<
      UpdateTenantSettingsCommand,
      Tenant
    >(new UpdateTenantSettingsCommand(id, dto.settings));
    return Response.success(tenant, 'Tenant settings updated successfully');
  }
}
