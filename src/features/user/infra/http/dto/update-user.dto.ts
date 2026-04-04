import { IsBoolean, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsBoolean()
  readonly mfaEnabled: boolean;

  @IsString()
  readonly mfaSecret: string;
}
