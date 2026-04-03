import { UserEntity } from 'src/features/user/infra/persistence/user.entity';
import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';

@Entity('tenants')
export class TenantEntity extends BaseEntity {
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
}
