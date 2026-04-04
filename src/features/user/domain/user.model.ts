import { Profile } from '@features/profile/domain';

export class User {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  tenantId: string;
  mfaEnabled: boolean;
  mfaSecret: string | null;
  lastLoginAt?: Date;
  profile: Profile;

  constructor() {}

  static create(
    id: string,
    email: string,
    password: string,
    tenantId: string,
    isActive: boolean,
    mfaEnabled: boolean,
    mfaSecret: string | null,
    lastLoginAt?: Date,
  ): User {
    const user = new User();
    user.id = id;
    user.email = email;
    user.password = password;
    user.tenantId = tenantId;
    user.isActive = isActive;
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
    this.mfaSecret = null;
  }

  setMfaSecret(secret: string) {
    this.mfaSecret = secret;
    this.mfaEnabled = true;
  }

  setLastLoginAt(date: Date) {
    this.lastLoginAt = date;
  }
  unSetPassword() {
    this.password = '';
  }
}
