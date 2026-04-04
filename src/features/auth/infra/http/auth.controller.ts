import { Response } from '@core/utils';
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
    const data = await this.commandBus.execute<LoginCommand, LoginResponseDto>(
      command,
    );
    return Response.success(data, 'Login successful');
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
    const message = await this.commandBus.execute<RegisterCommand, string>(
      command,
    );
    return Response.success(null, message);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    const command = new RefreshCommand(dto.refreshToken);
    const data = await this.commandBus.execute<
      RefreshCommand,
      LoginResponseDto
    >(command);
    return Response.success(data, 'Refresh successful');
  }

  @Post('logout')
  async logout(@Body() dto: RefreshDto) {
    const command = new LogoutCommand(dto.refreshToken);
    await this.commandBus.execute<LogoutCommand, boolean>(command);
    return Response.success(null, 'Logout successful');
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    const command = new ForgotPasswordCommand(dto.email);
    const message = await this.commandBus.execute<
      ForgotPasswordCommand,
      string
    >(command);
    return Response.success(null, message);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const command = new ResetPasswordCommand(dto.token, dto.password);
    await this.commandBus.execute<ResetPasswordCommand, string>(command);
    return Response.success(null, 'Password reset successful');
  }
}
