import { BaseEntity } from '@features/common';
import { ProfileEntity } from '@features/profile/infra/persistence';
import { TenantEntity } from '@features/tenant/infra/persistence';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  tenantId: string;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @Column({ name: 'last_login_at', nullable: true, type: 'timestamp' })
  lastLoginAt: Date;

  @Column({ name: 'mfa_secret', nullable: true })
  mfaSecret: string;

  @Column({ name: 'mfa_enabled', default: false })
  mfaEnabled: boolean;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.users)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;
}
