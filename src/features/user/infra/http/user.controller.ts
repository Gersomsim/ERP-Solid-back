import { Auth } from '@core/decorators/auth.decorator';
import { Pagination } from '@features/common/interfaces';
import {
  ChangePasswordCommand,
  CreateUserCommand,
  UpdateUserCommand,
} from '@features/user/app/commands';
import { FindAllUsersQuery } from '@features/user/app/queries';
import { User } from '@features/user/domain';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ChangePasswordDto, CreateUserDto, FindAllUsersDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Auth()
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const id = await this.commandBus.execute<CreateUserCommand, string>(
      new CreateUserCommand(
        dto.email,
        dto.password,
        dto.tenantId,
        dto.firstName,
        dto.lastName,
      ),
    );
    return id;
  }

  @Get()
  async findAll(@Query() query: FindAllUsersDto) {
    return this.queryBus.execute<FindAllUsersQuery, Pagination<User>>(
      new FindAllUsersQuery(
        query.tenantId,
        query.page,
        query.limit,
        query.search,
        query.isActive,
      ),
    );
  }

  @Patch('change-password')
  async changePassword(@Body() dto: ChangePasswordDto) {
    const isSuccess = await this.commandBus.execute<
      ChangePasswordCommand,
      boolean
    >(new ChangePasswordCommand(dto.id, dto.newPassword, dto.oldPassword));
    return isSuccess;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const isSuccess = await this.commandBus.execute<UpdateUserCommand, boolean>(
      new UpdateUserCommand(id, dto.mfaEnabled, dto.mfaSecret),
    );
    return isSuccess;
  }
}
