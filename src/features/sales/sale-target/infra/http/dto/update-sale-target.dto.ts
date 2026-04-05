import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class UpdateSaleTargetDto {
  @IsUUID()
  @IsOptional()
  agentId?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  periodFrom?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  periodTo?: Date;

  @IsNumber()
  @Min(0)
  @IsOptional()
  targetAmount?: number;
}
