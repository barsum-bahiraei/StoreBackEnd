import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ type: 'string', required: true, default: 'email@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', required: true, default: 'password' })
  @IsString()
  @MinLength(8)
  password: string;
}
