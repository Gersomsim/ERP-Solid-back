import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator';

export class CreateCommissionRuleDto {
  @IsUUID()
  @IsNotEmpty()
  agentId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  percentage: number;
}
