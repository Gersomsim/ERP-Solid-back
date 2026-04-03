// modules/users/entities/profile.entity.ts
import { UserEntity } from 'src/features/user/infra/persistence/user.entity';
import { BaseEntity, Column, Entity, OneToOne } from 'typeorm';

@Entity('profiles')
export class ProfileEntity extends BaseEntity {
  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  jobTitle: string;

  // Relación inversa para poder acceder al usuario desde el perfil si fuera necesario
  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;
}
