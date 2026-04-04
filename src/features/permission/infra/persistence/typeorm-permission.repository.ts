import {
  IPermissionRepository,
  Permission,
} from '@features/permission/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from './permission.entity';

@Injectable()
export class TypeOrmPermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly repository: Repository<PermissionEntity>,
  ) {}

  async create(permission: Permission): Promise<Permission> {
    const entity = this.repository.create({
      slug: permission.slug,
      name: permission.name,
      group: permission.group,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findBySlug(slug: string): Promise<Permission | null> {
    const entity = await this.repository.findOne({ where: { slug } });
    return entity ? this.toDomain(entity) : null;
  }

  private toDomain(entity: PermissionEntity): Permission {
    return Permission.create(entity.slug, entity.name, entity.group);
  }
}
