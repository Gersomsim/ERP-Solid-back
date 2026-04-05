import { CommissionStatus } from '@features/sales/commission/domain';
import { IsEnum, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class FindAllCommissionsDto {
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number;

  @IsEnum(CommissionStatus)
  @IsOptional()
  status?: CommissionStatus;

  @IsUUID()
  @IsOptional()
  agentId?: string;

  @IsUUID()
  @IsOptional()
  saleId?: string;
}
