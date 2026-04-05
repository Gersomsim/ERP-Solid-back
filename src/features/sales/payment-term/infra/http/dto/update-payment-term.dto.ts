import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePaymentTermDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  days?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
