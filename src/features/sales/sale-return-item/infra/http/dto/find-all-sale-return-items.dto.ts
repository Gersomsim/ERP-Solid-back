import { IsNumber, IsOptional, Min } from 'class-validator';

export class FindAllSaleReturnItemsDto {
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number;
}
