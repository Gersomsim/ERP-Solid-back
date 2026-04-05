import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateCommissionRuleDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  percentage?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
