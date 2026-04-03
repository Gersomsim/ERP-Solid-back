import { UserEntity } from '@features/user/infra/persistence/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tenants')
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ unique: true })
  taxIdentifier: string;

  @Column({ type: 'jsonb', nullable: true })
  settings: Record<string, any>;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => UserEntity, (user) => user.tenant)
  users: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn() // Soft Delete
  deletedAt: Date;
}
