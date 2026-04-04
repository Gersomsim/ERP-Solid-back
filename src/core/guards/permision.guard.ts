import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_PERMISSIONS } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      REQUIRE_PERMISSIONS,
      context.getHandler(),
    );
    if (!requiredPermissions) return true;

    const { user } = context.switchToHttp().getRequest();

    // Verificamos si el slug del permiso requerido está en la lista de permisos del rol del usuario
    return requiredPermissions.every((perm) =>
      user.role?.permissions?.some((p) => p.slug === perm),
    );
  }
}
