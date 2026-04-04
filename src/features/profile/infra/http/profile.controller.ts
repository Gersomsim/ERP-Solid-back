import { Auth, GetUser, Permissions } from '@core/decorators';
import { Response } from '@core/utils';
import { UpdateProfileCommand } from '@features/profile/app/commands';
import { Profile } from '@features/profile/domain';
import { User } from '@features/user/domain';
import { Body, Controller, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateProfileDto } from './dto';

@Auth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch()
  @Permissions('profile.update')
  async update(@Body() dto: UpdateProfileDto, @GetUser() user: User) {
    const profile = await this.commandBus.execute<
      UpdateProfileCommand,
      Profile
    >(
      new UpdateProfileCommand(
        user.id,
        dto.firstName,
        dto.lastName,
        dto.avatarUrl,
        dto.jobTitle,
        dto.phoneNumber,
      ),
    );
    return Response.success(profile, 'Profile updated successfully');
  }
}
