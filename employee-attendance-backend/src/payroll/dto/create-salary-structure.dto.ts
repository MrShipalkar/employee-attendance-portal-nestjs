import {
  IsUUID,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateSalaryStructureDto {
  @IsUUID()
  employeeId: string;

  @IsNumber()
  basicSalary: number;

  @IsOptional()
  @IsNumber()
  hra?: number;

  @IsOptional()
  @IsNumber()
  da?: number;

  @IsOptional()
  @IsNumber()
  specialAllowance?: number;

  @IsOptional()
  @IsNumber()
  bonus?: number;

  @IsOptional()
  @IsNumber()
  pfDeduction?: number;

  @IsOptional()
  @IsNumber()
  professionalTax?: number;

  @IsOptional()
  @IsNumber()
  tds?: number;
}