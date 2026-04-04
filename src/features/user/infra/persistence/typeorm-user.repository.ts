import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException('User not found');
    }
    if (newPass) {
      const passHash = await bcrypt.hash(newPass, 10);
      userEntity.password = passHash;
    }
    userEntity.email = user.email;
    userEntity.mfaEnabled = user.mfaEnabled;
    userEntity.mfaSecret = user.mfaSecret;
    userEntity.lastLoginAt = user.lastLoginAt;
    const savedUser = await this.repository.save(userEntity);
    return this.toDomain(savedUser);
  }
  async delete(id: string): Promise<void> {
    const userEntity = await this.repository.findOne({
      where: { id },
    });
    if (!userEntity) {
      throw new NotFoundException('User not found');
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

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private toDomain(user: UserEntity): User {
    return User.create(
      user.id,
      user.email,
      user.password,
      user.tenantId,
      user.mfaEnabled,
      user.mfaSecret,
      user.lastLoginAt,
    );
  }
}
