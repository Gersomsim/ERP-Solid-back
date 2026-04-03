import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository, User } from '../../domain';
import { UserEntity } from './user.entity';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    return user ? this.toDomain(user) : null;
  }

  private toDomain(user: UserEntity): User {
    return User.create({
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      tenantId: user.tenantId,
      mfaEnabled: user.mfaEnabled,
      mfaSecret: user.mfaSecret,
      lastLoginAt: user.lastLoginAt,
    });
  }
}
