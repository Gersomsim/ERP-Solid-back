import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FindAllCustomersDto {
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  search?: string;
}
