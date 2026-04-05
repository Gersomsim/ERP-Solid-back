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

  // ── Clientes ──────────────────────────────────────────────
  'customers.view',
  'customers.create',
  'customers.update',
  'customers.delete',

  // ── Agentes de venta ──────────────────────────────────────
  'sale-agents.view',
  'sale-agents.create',
  'sale-agents.update',
  'sale-agents.delete',

  // ── Ventas ────────────────────────────────────────────────
  'sales.view',
  'sales.create',
  'sales.update',
  'sales.delete',

  // ── Pagos de venta ────────────────────────────────────────
  'sale-payments.view',
  'sale-payments.create',
  'sale-payments.update',
  'sale-payments.delete',

  // ── Items de venta ────────────────────────────────────────
  'sale-items.view',
  'sale-items.create',
  'sale-items.update',
  'sale-items.delete',

  // ── Datos de venta de producto ────────────────────────────
  'product-sales-data.view',
  'product-sales-data.create',
  'product-sales-data.update',
  'product-sales-data.delete',

  // ── Listas de precios ─────────────────────────────────────
  'price-lists.view',
  'price-lists.create',
  'price-lists.update',
  'price-lists.delete',

  // ── Items de lista de precios ─────────────────────────────
  'price-list-items.view',
  'price-list-items.create',
  'price-list-items.update',
  'price-list-items.delete',

  // ── Devoluciones de venta ─────────────────────────────────
  'sale-returns.view',
  'sale-returns.create',
  'sale-returns.update',
  'sale-returns.delete',

  // ── Items de devoluciones de venta ────────────────────────
  'sale-return-items.view',
  'sale-return-items.create',
  'sale-return-items.delete',
];
