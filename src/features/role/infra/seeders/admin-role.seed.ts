/**
 * Permisos que se asignan automáticamente al rol "Administrador"
 * cuando se registra el primer usuario de un tenant.
 *
 * Actualizar este arreglo cada vez que se agregue una nueva
 * funcionalidad que el administrador del tenant deba gestionar.
 */
export const ADMIN_ROLE_PERMISSIONS_SLUGS: string[] = [
  // ── Usuarios ─────────────────────────────────────────────
  'users.view',
  'users.create',
  'users.update',
  'users.delete',
  'users.change-password',

  // ── Perfil ────────────────────────────────────────────────
  'profile.update',

  // ── Tenants ───────────────────────────────────────────────
  'tenants.view',
  'tenants.update',
  'tenants.settings',

  // ── Permisos ──────────────────────────────────────────────
  'permissions.view',
  'permissions.create',

  // ── Roles ─────────────────────────────────────────────────
  'roles.view',
  'roles.create',
  'roles.update',
  'roles.delete',
];
