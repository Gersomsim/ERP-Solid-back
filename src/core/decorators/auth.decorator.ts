import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PermissionsGuard } from '../guards/permision.guard';

export function Auth() {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(AuthGuard('jwt'), PermissionsGuard),
  );
}
