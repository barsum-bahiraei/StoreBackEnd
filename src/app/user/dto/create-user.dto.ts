import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  family: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  age: number;
}
