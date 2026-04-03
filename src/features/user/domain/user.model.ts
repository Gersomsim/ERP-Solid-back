export class User {
  id: string;
  email: string;
  isActive: boolean;
  tenantId: string;
  mfaEnabled: boolean;
  mfaSecret: string;
  lastLoginAt: Date;

  constructor() {}

  static create(props: User): User {
    const user = new User();
    Object.assign(user, props);
    return user;
  }
}
