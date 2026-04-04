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
    const tokenHash = await bcrypt.hash(token.hashedToken, 10);
    const entity = this.tokenRepository.create({
      userId: token.userId,
      selector: token.selector,
      hashedToken: tokenHash,
      type: token.type,
      expiresAt: token.expiresAt,
    });
    return this.tokenRepository.save(entity);
  }
  async findBySelector(selector: string): Promise<Token | null> {
    const entity = await this.tokenRepository.findOne({ where: { selector } });
    return entity ? this.toDomain(entity) : null;
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
      entity.hashedToken,
      entity.type,
      entity.expiresAt,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
