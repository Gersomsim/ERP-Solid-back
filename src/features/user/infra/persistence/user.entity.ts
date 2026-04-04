import { ProfileEntity } from '@features/profile/infra/persistence';
import { RoleEntity } from '@features/role/infra/persistence/role.entity';
import { TenantEntity } from '@features/tenant/infra/persistence';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @Column({ name: 'last_login_at', nullable: true, type: 'timestamp' })
  lastLoginAt?: Date;

  @Column({ name: 'mfa_secret', nullable: true, type: 'varchar' })
  mfaSecret: string | null;

  @Column({ name: 'mfa_enabled', default: false, type: 'boolean' })
  mfaEnabled: boolean;

  @ManyToOne(() => TenantEntity)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @OneToOne(() => ProfileEntity, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn() // Soft Delete
  deletedAt: Date;

  @ManyToOne(() => RoleEntity, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
