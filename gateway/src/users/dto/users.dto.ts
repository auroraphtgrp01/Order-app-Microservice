import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {}

export class queryParamsUser {
  @IsOptional()
  @IsNumberString()
  skip?: number;
  @IsOptional()
  @IsNumberString()
  limit?: number;
  @IsOptional()
  @IsString()
  orderby?: string;
  @IsOptional()
  @IsString()
  id?: string;
  @IsOptional()
  @IsString()
  email?: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsString()
  password: string;
  @IsString()
  @IsNotEmpty()
  id: string;
}
