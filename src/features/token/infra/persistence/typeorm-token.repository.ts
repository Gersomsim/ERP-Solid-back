import { ITokenRepository, Token } from '@features/token/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { TokenEntity } from './token.entity';

@Injectable()
export class TypeOrmTokenRepository implements ITokenRepository {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async create(token: Token): Promise<Token> {
    const tokenHash = await bcrypt.hash(token.rawToken, 10);
    const entity = this.tokenRepository.create({
      userId: token.userId,
      selector: token.selector,
      hashedToken: tokenHash,
      type: token.type,
      expiresAt: token.expiresAt,
    });
    const tokenCreated = await this.tokenRepository.save(entity);
    return this.toDomain(tokenCreated);
  }

  async findByUserId(userId: string, type: string): Promise<Token | null> {
    const entity = await this.tokenRepository.findOne({
      where: { userId, type },
    });
    if (!entity || entity.isRevoked || entity.expiresAt < new Date()) {
      return null;
    }
    return this.toDomain(entity);
  }

  async findBySelector(selector: string): Promise<Token | null> {
    const entity = await this.tokenRepository.findOne({ where: { selector } });
    if (!entity || entity.isRevoked || entity.expiresAt < new Date()) {
      return null;
    }
    return this.toDomain(entity);
  }
  async delete(id: string): Promise<void> {
    await this.tokenRepository.delete(id);
  }
  async validateToken(token: string, hashedToken: string): Promise<boolean> {
    return bcrypt.compare(token, hashedToken);
  }
  private toDomain(entity: TokenEntity): Token {
    return new Token(
      entity.id,
      entity.userId,
      entity.selector,
      '',
      entity.type,
      entity.isRevoked,
      entity.expiresAt,
      entity.createdAt,
      entity.updatedAt,
      entity.hashedToken,
    );
  }
  async revoke(id: string): Promise<void> {
    await this.tokenRepository.update(id, { isRevoked: true });
  }
}
