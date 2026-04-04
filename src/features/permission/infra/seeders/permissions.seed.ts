export interface PermissionSeed {
  slug: string;
  name: string;
  group: string;
}

export const PERMISSIONS_SEED: PermissionSeed[] = [
  // ── Usuarios ─────────────────────────────────────────────
  { slug: 'users.view', name: 'Ver usuarios', group: 'Usuarios' },
  { slug: 'users.create', name: 'Crear usuarios', group: 'Usuarios' },
  { slug: 'users.update', name: 'Actualizar usuarios', group: 'Usuarios' },
  { slug: 'users.delete', name: 'Eliminar usuarios', group: 'Usuarios' },
  {
    slug: 'users.change-password',
    name: 'Cambiar contraseña',
    group: 'Usuarios',
  },

  // ── Perfil ────────────────────────────────────────────────
  { slug: 'profile.update', name: 'Actualizar perfil', group: 'Perfil' },

  // ── Tenants ───────────────────────────────────────────────
  { slug: 'tenants.view', name: 'Ver tenant', group: 'Tenants' },
  { slug: 'tenants.update', name: 'Actualizar tenant', group: 'Tenants' },
  {
    slug: 'tenants.settings',
    name: 'Gestionar configuración',
    group: 'Tenants',
  },

  // ── Permisos ──────────────────────────────────────────────
  { slug: 'permissions.view', name: 'Ver permisos', group: 'Permisos' },
  { slug: 'permissions.create', name: 'Crear permisos', group: 'Permisos' },

  // ── Roles ─────────────────────────────────────────────────
  { slug: 'roles.view', name: 'Ver roles', group: 'Roles' },
  { slug: 'roles.create', name: 'Crear roles', group: 'Roles' },
  { slug: 'roles.update', name: 'Actualizar roles', group: 'Roles' },
  { slug: 'roles.delete', name: 'Eliminar roles', group: 'Roles' },
];
