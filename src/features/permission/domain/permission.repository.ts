import { Permission } from './permission.model';

export interface IPermissionRepository {
  create(permission: Permission): Promise<Permission>;
  findBySlug(slug: string): Promise<Permission | null>;
  findBySlugs(slugs: string[]): Promise<Permission[]>;
}
