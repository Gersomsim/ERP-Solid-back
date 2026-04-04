import { Permission } from '@features/permission/domain';
import { PermissionEntity } from '@features/permission/infra/persistence';
import { IRoleRepository, Role } from '@features/role/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class TypeOrmRoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {}

  async create(role: Role): Promise<Role> {
    const entity = this.repository.create({
      name: role.name,
      tenantId: role.tenantId,
      permissions: role.permissions.map(
        (p) => ({ id: p.id }) as PermissionEntity,
      ),
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Role | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(tenantId: string): Promise<Role[]> {
    const entities = await this.repository.find({ where: { tenantId } });
    return entities.map((e) => this.toDomain(e));
  }

  async update(role: Role): Promise<Role> {
    const entity = await this.repository.findOne({ where: { id: role.id } });
    if (!entity) throw new NotFoundException('Role not found');
    entity.name = role.name;
    entity.permissions = role.permissions.map(
      (p) => ({ id: p.id }) as PermissionEntity,
    );
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async hasUsers(_id: string): Promise<boolean> {
    return false; // delegado a IUserRepository en el handler
  }

  private toDomain(entity: RoleEntity): Role {
    const role = new Role();
    role.id = entity.id;
    role.name = entity.name;
    role.tenantId = entity.tenantId;
    role.permissions = (entity.permissions ?? []).map((p) =>
      Permission.create(p.slug, p.name, p.group),
    );
    return role;
  }
}
