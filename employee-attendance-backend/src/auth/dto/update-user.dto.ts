import {
  IsEmail,
  IsOptional,
  IsUUID,
  MinLength,
  IsBoolean,
} from 'class-validator';


export class UpdateUserDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsUUID()
  roleId?: string;

  @IsOptional()
  @IsUUID()
  managerId?: string;

  @IsOptional()
@IsBoolean()
isActive?: boolean;

@IsOptional()
profilePicture?: string;

}