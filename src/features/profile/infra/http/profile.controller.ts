import { Auth } from '@core/decorators/auth.decorator';
import { UpdateProfileCommand } from '@features/profile/app/commands';
import { Profile } from '@features/profile/domain';
import { User } from '@features/user/domain';
import { Body, Controller, Patch, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { UpdateProfileDto } from './dto';

@Auth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch()
  async update(
    @Body() dto: UpdateProfileDto,
    @Req() req: Request & { user: { user: User } },
  ): Promise<Profile> {
    return this.commandBus.execute<UpdateProfileCommand, Profile>(
      new UpdateProfileCommand(
        req.user.user.id,
        dto.firstName,
        dto.lastName,
        dto.avatarUrl,
        dto.jobTitle,
        dto.phoneNumber,
      ),
    );
  }
}
