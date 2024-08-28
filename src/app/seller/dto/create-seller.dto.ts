import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSellerDto {
  @ApiProperty({ type: 'string', required: true, default: 'name' })
  @IsString()
  name: string;
}
