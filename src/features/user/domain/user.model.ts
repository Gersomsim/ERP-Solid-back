import { Profile } from '@features/profile/domain';

export class User {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  tenantId: string;
  mfaEnabled: boolean;
  mfaSecret: string;
  lastLoginAt?: Date;
  profile: Profile;

  constructor() {}

  static create(
    id: string,
    email: string,
    password: string,
    tenantId: string,
    mfaEnabled: boolean,
    mfaSecret: string,
    lastLoginAt?: Date,
  ): User {
    const user = new User();
    user.id = id;
    user.email = email;
    user.password = password;
    user.tenantId = tenantId;
    user.mfaEnabled = mfaEnabled;
    user.mfaSecret = mfaSecret;
    user.lastLoginAt = lastLoginAt;
    return user;
  }

  inactivate() {
    this.isActive = false;
  }

  activate() {
    this.isActive = true;
  }

  enableMfa() {
    this.mfaEnabled = true;
  }

  disableMfa() {
    this.mfaEnabled = false;
  }

  setMfaSecret(secret: string) {
    this.mfaSecret = secret;
  }

  setLastLoginAt(date: Date) {
    this.lastLoginAt = date;
  }
}
