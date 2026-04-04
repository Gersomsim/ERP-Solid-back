// modules/users/entities/profile.entity.ts
import { UserEntity } from '@features/user/infra/persistence/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, name: 'first_name' })
  firstName: string;

  @Column({ length: 100, name: 'last_name' })
  lastName: string;

  @Column({ nullable: true, name: 'phone_number' })
  phoneNumber?: string;

  @Column({ nullable: true, name: 'avatar_url' })
  avatarUrl?: string;

  @Column({ nullable: true, name: 'job_title' })
  jobTitle?: string;

  // Relación inversa para poder acceder al usuario desde el perfil si fuera necesario
  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn() // Soft Delete
  deletedAt: Date;
}
