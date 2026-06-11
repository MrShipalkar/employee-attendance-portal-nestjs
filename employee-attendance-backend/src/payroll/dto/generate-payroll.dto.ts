import {
  IsUUID,
  IsNumber,
} from 'class-validator';

export class GeneratePayrollDto {
  @IsUUID()
  employeeId: string;

  @IsNumber()
  month: number;

  @IsNumber()
  year: number;
}