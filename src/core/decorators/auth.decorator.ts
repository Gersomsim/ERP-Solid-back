import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../guards/permision.guard';

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard('jwt'), PermissionsGuard));
}
