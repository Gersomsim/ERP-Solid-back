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

  // ── Clientes ──────────────────────────────────────────────
  { slug: 'customers.view', name: 'Ver clientes', group: 'Clientes' },
  { slug: 'customers.create', name: 'Crear clientes', group: 'Clientes' },
  { slug: 'customers.update', name: 'Actualizar clientes', group: 'Clientes' },
  { slug: 'customers.delete', name: 'Eliminar clientes', group: 'Clientes' },

  // ── Agentes de venta ──────────────────────────────────────
  { slug: 'sale-agents.view', name: 'Ver agentes de venta', group: 'Agentes de venta' },
  { slug: 'sale-agents.create', name: 'Crear agentes de venta', group: 'Agentes de venta' },
  { slug: 'sale-agents.update', name: 'Actualizar agentes de venta', group: 'Agentes de venta' },
  { slug: 'sale-agents.delete', name: 'Eliminar agentes de venta', group: 'Agentes de venta' },

  // ── Ventas ────────────────────────────────────────────────
  { slug: 'sales.view', name: 'Ver ventas', group: 'Ventas' },
  { slug: 'sales.create', name: 'Crear ventas', group: 'Ventas' },
  { slug: 'sales.update', name: 'Actualizar ventas', group: 'Ventas' },
  { slug: 'sales.delete', name: 'Eliminar ventas', group: 'Ventas' },

  // ── Pagos de venta ────────────────────────────────────────
  { slug: 'sale-payments.view', name: 'Ver pagos de venta', group: 'Pagos de venta' },
  { slug: 'sale-payments.create', name: 'Crear pagos de venta', group: 'Pagos de venta' },
  { slug: 'sale-payments.update', name: 'Actualizar pagos de venta', group: 'Pagos de venta' },
  { slug: 'sale-payments.delete', name: 'Eliminar pagos de venta', group: 'Pagos de venta' },

  // ── Items de venta ────────────────────────────────────────
  { slug: 'sale-items.view', name: 'Ver items de venta', group: 'Items de venta' },
  { slug: 'sale-items.create', name: 'Crear items de venta', group: 'Items de venta' },
  { slug: 'sale-items.update', name: 'Actualizar items de venta', group: 'Items de venta' },
  { slug: 'sale-items.delete', name: 'Eliminar items de venta', group: 'Items de venta' },

  // ── Datos de venta de producto ────────────────────────────
  { slug: 'product-sales-data.view', name: 'Ver datos de venta de producto', group: 'Datos de venta de producto' },
  { slug: 'product-sales-data.create', name: 'Crear datos de venta de producto', group: 'Datos de venta de producto' },
  { slug: 'product-sales-data.update', name: 'Actualizar datos de venta de producto', group: 'Datos de venta de producto' },
  { slug: 'product-sales-data.delete', name: 'Eliminar datos de venta de producto', group: 'Datos de venta de producto' },

  // ── Listas de precios ─────────────────────────────────────
  { slug: 'price-lists.view', name: 'Ver listas de precios', group: 'Listas de precios' },
  { slug: 'price-lists.create', name: 'Crear listas de precios', group: 'Listas de precios' },
  { slug: 'price-lists.update', name: 'Actualizar listas de precios', group: 'Listas de precios' },
  { slug: 'price-lists.delete', name: 'Eliminar listas de precios', group: 'Listas de precios' },

  // ── Items de lista de precios ─────────────────────────────
  { slug: 'price-list-items.view', name: 'Ver items de lista de precios', group: 'Items de lista de precios' },
  { slug: 'price-list-items.create', name: 'Crear items de lista de precios', group: 'Items de lista de precios' },
  { slug: 'price-list-items.update', name: 'Actualizar items de lista de precios', group: 'Items de lista de precios' },
  { slug: 'price-list-items.delete', name: 'Eliminar items de lista de precios', group: 'Items de lista de precios' },

  // ── Devoluciones de venta ─────────────────────────────────
  { slug: 'sale-returns.view', name: 'Ver devoluciones de venta', group: 'Devoluciones de venta' },
  { slug: 'sale-returns.create', name: 'Crear devoluciones de venta', group: 'Devoluciones de venta' },
  { slug: 'sale-returns.update', name: 'Gestionar devoluciones de venta', group: 'Devoluciones de venta' },
  { slug: 'sale-returns.delete', name: 'Eliminar devoluciones de venta', group: 'Devoluciones de venta' },

  // ── Items de devoluciones de venta ────────────────────────
  { slug: 'sale-return-items.view', name: 'Ver items de devoluciones', group: 'Items de devoluciones de venta' },
  { slug: 'sale-return-items.create', name: 'Crear items de devoluciones', group: 'Items de devoluciones de venta' },
  { slug: 'sale-return-items.delete', name: 'Eliminar items de devoluciones', group: 'Items de devoluciones de venta' },

  // ── Reglas de comision ────────────────────────────────────
  { slug: 'commission-rules.view', name: 'Ver reglas de comision', group: 'Reglas de comision' },
  { slug: 'commission-rules.create', name: 'Crear reglas de comision', group: 'Reglas de comision' },
  { slug: 'commission-rules.update', name: 'Actualizar reglas de comision', group: 'Reglas de comision' },
  { slug: 'commission-rules.delete', name: 'Eliminar reglas de comision', group: 'Reglas de comision' },

  // ── Comisiones ────────────────────────────────────────────
  { slug: 'commissions.view', name: 'Ver comisiones', group: 'Comisiones' },
  { slug: 'commissions.update', name: 'Gestionar comisiones', group: 'Comisiones' },

  // ── Pagos de comision ─────────────────────────────────────
  { slug: 'commission-payments.view', name: 'Ver pagos de comision', group: 'Pagos de comision' },
  { slug: 'commission-payments.create', name: 'Crear pagos de comision', group: 'Pagos de comision' },
  { slug: 'commission-payments.update', name: 'Gestionar pagos de comision', group: 'Pagos de comision' },
  { slug: 'commission-payments.delete', name: 'Eliminar pagos de comision', group: 'Pagos de comision' },

  // ── Condiciones de pago ───────────────────────────────────
  { slug: 'payment-terms.view', name: 'Ver condiciones de pago', group: 'Condiciones de pago' },
  { slug: 'payment-terms.create', name: 'Crear condiciones de pago', group: 'Condiciones de pago' },
  { slug: 'payment-terms.update', name: 'Actualizar condiciones de pago', group: 'Condiciones de pago' },
  { slug: 'payment-terms.delete', name: 'Eliminar condiciones de pago', group: 'Condiciones de pago' },

  // ── Metas de ventas ───────────────────────────────────────
  { slug: 'sale-targets.view', name: 'Ver metas de ventas', group: 'Metas de ventas' },
  { slug: 'sale-targets.create', name: 'Crear metas de ventas', group: 'Metas de ventas' },
  { slug: 'sale-targets.update', name: 'Actualizar metas de ventas', group: 'Metas de ventas' },
  { slug: 'sale-targets.delete', name: 'Eliminar metas de ventas', group: 'Metas de ventas' },

  // ── Productos ─────────────────────────────────────────────
  { slug: 'products.view', name: 'Ver productos', group: 'Productos' },
  { slug: 'products.create', name: 'Crear productos', group: 'Productos' },
  { slug: 'products.update', name: 'Actualizar productos', group: 'Productos' },
  { slug: 'products.delete', name: 'Eliminar productos', group: 'Productos' },
];
