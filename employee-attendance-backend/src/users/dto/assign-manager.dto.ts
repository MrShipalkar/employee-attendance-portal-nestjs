import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AssignManagerDto {
  @ApiProperty({
    example:
      '861b49b8-a682-472a-a2c8-71fcf99efeea',
  })
  @IsUUID()
  declare managerId: string;
}