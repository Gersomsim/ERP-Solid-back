import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+\.[a-z0-9-]+$/, {
    message: 'slug must follow the format "group.action" (e.g. users.view)',
  })
  slug: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  group: string;
}
