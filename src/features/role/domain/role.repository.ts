import { Role } from './role.model';

export interface IRoleRepository {
  create(role: Role): Promise<Role>;
  findById(id: string): Promise<Role | null>;
  findAll(tenantId: string): Promise<Role[]>;
  update(role: Role): Promise<Role>;
  delete(id: string): Promise<void>;
  hasUsers(id: string): Promise<boolean>;
}
