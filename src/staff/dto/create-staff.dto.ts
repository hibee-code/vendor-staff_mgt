import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  position: string;
}
