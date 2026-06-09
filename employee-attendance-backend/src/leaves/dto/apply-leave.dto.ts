import {
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ApplyLeaveDto {
  @ApiProperty({
    example: '2026-06-10',
  })
  @IsDateString()
  declare startDate: Date;

  @ApiProperty({
    example: '2026-06-12',
  })
  @IsDateString()
  declare endDate: Date;

  @ApiProperty({
    example: 'SICK',
  })
  @IsNotEmpty()
   declare leaveType: string;

  @ApiProperty({
    example:
      'Fever and doctor advised rest',
  })
  @IsNotEmpty()
  declare reason: string;
}