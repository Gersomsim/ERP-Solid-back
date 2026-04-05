import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePriceListDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;

  @IsDateString()
  @IsOptional()
  validFrom?: string;

  @IsDateString()
  @IsOptional()
  validTo?: string;
}
