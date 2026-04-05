import { IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class FindAllSaleItemsDto {
  @IsUUID()
  saleId: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number;
}
