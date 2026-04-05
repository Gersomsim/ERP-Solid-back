import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateSaleTargetDto {
  @IsUUID()
  @IsNotEmpty()
  agentId: string;

  @IsDate()
  @Type(() => Date)
  periodFrom: Date;

  @IsDate()
  @Type(() => Date)
  periodTo: Date;

  @IsNumber()
  @Min(0)
  targetAmount: number;
}
