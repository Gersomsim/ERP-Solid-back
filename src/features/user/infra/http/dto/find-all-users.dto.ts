import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllUsersDto {
  @IsString()
  @IsOptional()
  tenantId?: string;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
