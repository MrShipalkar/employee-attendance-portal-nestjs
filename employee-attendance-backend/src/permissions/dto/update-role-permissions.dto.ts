import {
  IsArray,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolePermissionsDto {
  @ApiProperty({
    type: [String],
    example: [
      '6d91f67c-5d2f-4c2b-b3d3-897f64cae34f',
      '1798355d-a052-4468-9fdb-9adacb6bcd06',
    ],
  })
  @IsArray()
  @IsUUID('4', {
    each: true,
  })
  permissionIds: string[];
}