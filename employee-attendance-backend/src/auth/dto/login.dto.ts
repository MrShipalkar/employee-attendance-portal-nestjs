import {
  IsNotEmpty,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description:
      'Username of the user',
  })
  @IsNotEmpty()
  declare username: string;

  @ApiProperty({
    example: 'Admin@123',
    description:
      'Password of the user',
  })
  @IsNotEmpty()
  declare password: string;
}