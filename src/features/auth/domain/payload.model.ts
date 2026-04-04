import { randomUUID } from 'crypto';

export class Payload {
  public jti?: string;
  public userId: string;
  public tenantId: string;
  public type: 'access' | 'refresh';
  constructor() {}

  static createAccess(userId: string, tenantId: string): Payload {
    const payload = new Payload();
    payload.userId = userId;
    payload.tenantId = tenantId;
    payload.type = 'access';
    return payload;
  }

  static createRefresh(userId: string, tenantId: string): Payload {
    const payload = new Payload();
    payload.jti = randomUUID();
    payload.userId = userId;
    payload.tenantId = tenantId;
    payload.type = 'refresh';
    return payload;
  }
}
