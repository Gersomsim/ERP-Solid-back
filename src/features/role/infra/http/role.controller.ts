import { Auth, GetUser, Permissions } from '@core/decorators';
import {
  CreateRoleCommand,
  DeleteRoleCommand,
  UpdateRoleCommand,
} from '@features/role/app/commands';
import { FindAllRolesQuery, FindRoleQuery } from '@features/role/app/queries';
import { Role } from '@features/role/domain';
import { User } from '@features/user/domain';
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
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Auth()
@Controller('roles')
export class RoleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('roles.create')
  async create(
    @Body() dto: CreateRoleDto,
    @GetUser() user: User,
  ): Promise<Role> {
    return this.commandBus.execute<CreateRoleCommand, Role>(
      new CreateRoleCommand(dto.name, user.tenantId, dto.permissionSlugs),
    );
  }

  @Get()
  @Permissions('roles.view')
  async findAll(@GetUser() user: User): Promise<Role[]> {
    return this.queryBus.execute<FindAllRolesQuery, Role[]>(
      new FindAllRolesQuery(user.tenantId),
    );
  }

  @Get(':id')
  @Permissions('roles.view')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.queryBus.execute<FindRoleQuery, Role>(new FindRoleQuery(id));
  }

  @Patch(':id')
  @Permissions('roles.update')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<Role> {
    return this.commandBus.execute<UpdateRoleCommand, Role>(
      new UpdateRoleCommand(id, dto.name, dto.permissionSlugs),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('roles.delete')
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute<DeleteRoleCommand, void>(
      new DeleteRoleCommand(id),
    );
  }
}
