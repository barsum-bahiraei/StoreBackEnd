import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSellerDto {
  @ApiProperty({ type: 'string', required: true, default: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', required: true, default: 'family' })
  @IsString()
  family: string;

  @ApiProperty({ type: 'number', required: true, default: 2 })
  @IsNumber()
  age: number;
}
