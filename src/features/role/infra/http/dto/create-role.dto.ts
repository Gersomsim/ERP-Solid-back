import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  permissionSlugs: string[] = [];
}
