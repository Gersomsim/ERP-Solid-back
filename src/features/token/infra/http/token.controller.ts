import { Response } from '@core/utils';
import { ValidateTokenQuery } from '@features/token/app/queries/impl/validate-token.query';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ValidateTokenDto } from './DTO/validate-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('validate')
  @HttpCode(200)
  async validateToken(@Body() body: ValidateTokenDto) {
    const result = await this.queryBus.execute<ValidateTokenQuery, boolean>(
      new ValidateTokenQuery(body.token, body.type),
    );
    if (!result) {
      throw new UnauthorizedException('Token invalido');
    }
    return Response.success({ valid: result }, 'Token validado correctamente');
  }
}
