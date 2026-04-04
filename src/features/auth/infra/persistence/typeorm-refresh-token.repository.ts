import { IRefreshTokenRepository, RefreshToken } from '@features/auth/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class TypeOrmRefreshTokenRepository implements IRefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly repository: Repository<RefreshTokenEntity>,
  ) {}

  async save(refreshToken: RefreshToken): Promise<void> {
    const entity = this.repository.create({
      jti: refreshToken.jti,
      userId: refreshToken.userId,
      expiresAt: refreshToken.expiresAt,
      revokedAt: refreshToken.revokedAt,
      ipAddress: refreshToken.ipAddress,
      userAgent: refreshToken.userAgent,
    });
    await this.repository.save(entity);
  }

  async findByJti(jti: string): Promise<RefreshToken | null> {
    const entity = await this.repository.findOne({ where: { jti } });
    if (!entity) return null;
    return new RefreshToken(
      entity.jti,
      entity.userId,
      entity.expiresAt,
      entity.revokedAt,
      entity.ipAddress,
      entity.userAgent,
    );
  }

  async revoke(jti: string): Promise<void> {
    await this.repository.update({ jti }, { revokedAt: new Date() });
  }
}
