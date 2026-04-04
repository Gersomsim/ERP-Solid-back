import {
  ForgotPasswordCommand,
  LoginCommand,
  LogoutCommand,
  RefreshCommand,
  RegisterCommand,
  ResetPasswordCommand,
} from '@features/auth/app/commands';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { type Request } from 'express';
import {
  ForgotPasswordDto,
  LoginDto,
  RefreshDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];
    const command = new LoginCommand(
      dto.email,
      dto.password,
      ipAddress,
      userAgent,
    );
    return this.commandBus.execute<LoginCommand, LoginResponseDto>(command);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const command = new RegisterCommand(
      dto.email,
      dto.password,
      dto.firstName,
      dto.lastName,
      dto.tenantId,
      dto.roleId,
    );
    return this.commandBus.execute<RegisterCommand, string>(command);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    const command = new RefreshCommand(dto.refreshToken);
    return this.commandBus.execute<RefreshCommand, LoginResponseDto>(command);
  }

  @Post('logout')
  async logout(@Body() dto: RefreshDto) {
    const command = new LogoutCommand(dto.refreshToken);
    return this.commandBus.execute<LogoutCommand, boolean>(command);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    const command = new ForgotPasswordCommand(dto.email);
    return this.commandBus.execute<ForgotPasswordCommand, void>(command);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const command = new ResetPasswordCommand(dto.token, dto.password);
    return this.commandBus.execute<ResetPasswordCommand, boolean>(command);
  }
}
