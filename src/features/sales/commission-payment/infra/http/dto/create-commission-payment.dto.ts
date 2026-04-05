import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCommissionPaymentDto {
  @IsUUID()
  @IsNotEmpty()
  agentId: string;

  @IsDateString()
  periodFrom: string;

  @IsDateString()
  periodTo: string;
}
