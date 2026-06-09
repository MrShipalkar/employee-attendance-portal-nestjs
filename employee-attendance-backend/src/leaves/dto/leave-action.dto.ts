import {
  IsOptional,
  IsString,
} from 'class-validator';

export class LeaveActionDto {
  @IsOptional()
  @IsString()
  remarks?: string;
}