import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: 'string', required: true, default: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', required: true, default: 'family' })
  @IsString()
  family: string;

  @ApiProperty({ type: 'string', required: true, default: 'email@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', required: true, default: 'password' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ type: 'number', required: true, default: 26 })
  @IsNumber()
  age: number;
}
