import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import { Permission } from '@features/permission/domain';
import { Profile } from '@features/profile/domain';
import { Role } from '@features/role/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { FindAllUsersParams, IUserRepository, User } from '../../domain';
import { UserEntity } from './user.entity';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user ? this.toDomain(user) : null;
  }
  async create(user: User): Promise<User> {
    const passHash = await bcrypt.hash(user.password, 10);
    const userEntity = this.repository.create({
      email: user.email,
      password: passHash,
      tenantId: user.tenantId,
      mfaEnabled: user.mfaEnabled,
      mfaSecret: user.mfaSecret,
      lastLoginAt: user.lastLoginAt,
      role: user.roleId ? { id: user.roleId } : undefined,
      profile: {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
      },
    });
    const savedUser = await this.repository.save(userEntity);
    return this.toDomain(savedUser);
  }
  async update(user: User, newPass?: string): Promise<User> {
    const userEntity = await this.repository.findOne({
      where: { id: user.id },
    });
    if (!userEntity) {
      throw new EntityNotFoundException('User', user.id);
    }
    if (newPass) {
      const passHash = await bcrypt.hash(newPass, 10);
      userEntity.password = passHash;
    }
    userEntity.email = user.email;
    userEntity.mfaEnabled = user.mfaEnabled;
    userEntity.mfaSecret = user.mfaSecret;
    userEntity.lastLoginAt = user.lastLoginAt;
    userEntity.isActive = user.isActive;
    const savedUser = await this.repository.save(userEntity);
    return this.toDomain(savedUser);
  }
  async delete(id: string): Promise<void> {
    const userEntity = await this.repository.findOne({
      where: { id },
    });
    if (!userEntity) {
      throw new EntityNotFoundException('User', id);
    }
    await this.repository.softRemove(userEntity);
  }
  async findAll(params: FindAllUsersParams): Promise<Pagination<User>> {
    const { tenantId, page = 1, limit = 10, search, isActive } = params;
    const where: FindOptionsWhere<UserEntity> = {};

    if (tenantId) {
      where.tenantId = tenantId;
    }

    if (search) {
      where.email = Like(`%${search}%`);
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const [items, totalItems] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return {
      data: items.map((user) => this.toDomain(user)),
      pagination: setPagination(totalItems, limit, page, items.length),
    };
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    return user ? this.toDomain(user) : null;
  }

  async updateLastLogin(id: string, date: Date): Promise<void> {
    await this.repository.update(id, { lastLoginAt: date });
  }

  async existsByRoleId(roleId: string): Promise<boolean> {
    const count = await this.repository.count({ where: { role: { id: roleId } } });
    return count > 0;
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private toDomain(user: UserEntity): User {
    const userDomain = User.create(
      user.id,
      user.email,
      user.password,
      user.tenantId,
      user.isActive,
      user.mfaEnabled,
      user.mfaSecret,
      user.lastLoginAt,
      user.role?.id,
    );
    userDomain.profile = Profile.create(
      user.profile.firstName,
      user.profile.lastName,
      user.profile.avatarUrl,
      user.profile.jobTitle,
      user.profile.phoneNumber,
    );
    if (user.role) {
      const permissions = (user.role.permissions ?? []).map((p) => {
        const perm = Permission.create(p.slug, p.name, p.group);
        perm.id = p.id;
        return perm;
      });
      const role = Role.create(user.role.name, user.role.tenantId, permissions);
      role.id = user.role.id;
      userDomain.role = role;
    }
    return userDomain;
  }
}
