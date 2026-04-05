import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePaymentTermDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  days: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
