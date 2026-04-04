import { Auth } from '@core/decorators/auth.decorator';
import { CreatePermissionCommand } from '@features/permission/app/commands';
import { Permission } from '@features/permission/domain';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePermissionDto } from './dto';

@Auth()
@Controller('permissions')
export class PermissionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() dto: CreatePermissionDto): Promise<Permission> {
    return this.commandBus.execute<CreatePermissionCommand, Permission>(
      new CreatePermissionCommand(dto.slug, dto.name, dto.group),
    );
  }
}
