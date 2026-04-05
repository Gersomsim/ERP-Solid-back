import { IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class UpdateSaleAgentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  commissionRate?: number;

  @IsUUID()
  @IsOptional()
  userId?: string;
}
