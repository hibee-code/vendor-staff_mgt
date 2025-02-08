import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  passwordHash: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
