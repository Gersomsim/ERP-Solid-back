import { IProfileRepository, Profile } from '@features/profile/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Injectable()
export class TypeOrmProfileRepository implements IProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly repository: Repository<ProfileEntity>,
  ) {}

  async findByUserId(userId: string): Promise<Profile | null> {
    const entity = await this.repository.findOne({
      where: { user: { id: userId } },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async update(userId: string, profile: Profile): Promise<Profile> {
    const entity = await this.repository.findOne({
      where: { user: { id: userId } },
    });
    if (!entity) {
      throw new NotFoundException('Profile not found');
    }
    entity.firstName = profile.firstName;
    entity.lastName = profile.lastName;
    entity.avatarUrl = profile.avatarUrl;
    entity.jobTitle = profile.jobTitle;
    entity.phoneNumber = profile.phoneNumber;
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  private toDomain(entity: ProfileEntity): Profile {
    return Profile.create(
      entity.firstName,
      entity.lastName,
      entity.avatarUrl,
      entity.jobTitle,
      entity.phoneNumber,
    );
  }
}
