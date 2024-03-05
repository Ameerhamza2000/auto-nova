
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterAuthDto {
  @IsOptional()
  @IsString()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
