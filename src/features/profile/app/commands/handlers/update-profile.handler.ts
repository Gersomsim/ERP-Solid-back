import { Profile, type IProfileRepository } from '@features/profile/domain';
import { ProfileToken } from '@features/profile/infra/persistence';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProfileCommand } from '../impl/update-profile.command';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler implements ICommandHandler<UpdateProfileCommand> {
  constructor(
    @Inject(ProfileToken)
    private readonly profileRepository: IProfileRepository,
  ) {}

  async execute(command: UpdateProfileCommand): Promise<Profile> {
    const existing = await this.profileRepository.findByUserId(command.userId);
    if (!existing) {
      throw new NotFoundException('Profile not found');
    }

    const updated = Profile.create(
      command.firstName ?? existing.firstName,
      command.lastName ?? existing.lastName,
      command.avatarUrl ?? existing.avatarUrl,
      command.jobTitle ?? existing.jobTitle,
      command.phoneNumber ?? existing.phoneNumber,
    );

    return this.profileRepository.update(command.userId, updated);
  }
}
