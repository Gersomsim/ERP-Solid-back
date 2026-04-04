import { IsIn, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class UpdateTenantDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug must contain only lowercase letters, numbers and hyphens',
  })
  slug?: string;

  @IsString()
  @IsOptional()
  taxIdentifier?: string;

  @IsString()
  @IsOptional()
  @IsIn(['active', 'inactive', 'suspended'])
  status?: string;
}
