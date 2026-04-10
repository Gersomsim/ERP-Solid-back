import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsBoolean()
  @IsOptional()
  storable?: boolean;

  @IsBoolean()
  @IsOptional()
  sellable?: boolean;

  @IsBoolean()
  @IsOptional()
  buyable?: boolean;

  @IsBoolean()
  @IsOptional()
  service?: boolean;
}
