import { IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class FindAllSaleTargetsDto {
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number;

  @IsUUID()
  @IsOptional()
  agentId?: string;
}
