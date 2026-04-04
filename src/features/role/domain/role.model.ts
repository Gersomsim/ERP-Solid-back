import { Permission } from '@features/permission/domain';

export class Role {
  id: string;
  name: string;
  tenantId: string;
  permissions: Permission[];

  constructor() {}

  static create(
    name: string,
    tenantId: string,
    permissions: Permission[] = [],
  ): Role {
    const role = new Role();
    role.name = name;
    role.tenantId = tenantId;
    role.permissions = permissions;
    return role;
  }
}
