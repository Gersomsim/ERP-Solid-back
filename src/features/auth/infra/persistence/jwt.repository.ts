import { IJwtRepository, Payload } from '@features/auth/domain';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRepository implements IJwtRepository {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: Payload): string {
    return this.jwtService.sign(payload);
  }
  verifyToken(token: string): Payload {
    return this.jwtService.verify(token);
  }
}
