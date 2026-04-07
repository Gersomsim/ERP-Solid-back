import { envs } from '@core/config/envs.config';
import { Response } from '@core/utils';
import {
  ForgotPasswordCommand,
  LoginCommand,
  LogoutCommand,
  RefreshCommand,
  RegisterCommand,
  ResetPasswordCommand,
} from '@features/auth/app/commands';
import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { type Request, type Response as ExpressResponse } from 'express';
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './dto';
import { LoginResponseDto } from './dto/login-response.dto';

const REFRESH_TOKEN_COOKIE = 'refresh_token';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const command = new LoginCommand(
      dto.email,
      dto.password,
      req.ip,
      req.headers['user-agent'],
    );
    const data = await this.commandBus.execute<LoginCommand, LoginResponseDto>(command);

    res.cookie(REFRESH_TOKEN_COOKIE, data.refreshToken, {
      httpOnly: true,
      secure: envs.app.env === 'production',
      sameSite: 'strict',
      maxAge: envs.jwt.refreshExpiresIn * 1000,
      path: '/',
    });

    return Response.success({ user: data.user, token: data.token }, 'Login successful');
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
    const message = await this.commandBus.execute<RegisterCommand, string>(command);
    return Response.success(null, message);
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE];
    if (!refreshToken) throw new UnauthorizedException('No refresh token provided');

    const command = new RefreshCommand(refreshToken);
    const data = await this.commandBus.execute<RefreshCommand, LoginResponseDto>(command);

    res.cookie(REFRESH_TOKEN_COOKIE, data.refreshToken, {
      httpOnly: true,
      secure: envs.app.env === 'production',
      sameSite: 'strict',
      maxAge: envs.jwt.refreshExpiresIn * 1000,
      path: '/',
    });

    return Response.success({ user: data.user, token: data.token }, 'Refresh successful');
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE];
    if (!refreshToken) throw new UnauthorizedException('No refresh token provided');

    const command = new LogoutCommand(refreshToken);
    await this.commandBus.execute<LogoutCommand, boolean>(command);

    res.clearCookie(REFRESH_TOKEN_COOKIE, { path: '/' });
    return Response.success(null, 'Logout successful');
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    const command = new ForgotPasswordCommand(dto.email);
    const message = await this.commandBus.execute<ForgotPasswordCommand, string>(command);
    return Response.success(null, message);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const command = new ResetPasswordCommand(dto.token, dto.password);
    await this.commandBus.execute<ResetPasswordCommand, string>(command);
    return Response.success(null, 'Password reset successful');
  }
}
