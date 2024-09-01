import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSellerDto {
  @ApiProperty({ type: 'string', required: true, default: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', required: true, default: '1' })
  @IsString()
  latitude: string;

  @ApiProperty({ type: 'string', required: true, default: '1' })
  @IsString()
  longitude: string;

  @ApiProperty({ type: 'string', required: true, default: 'logo' })
  @IsString()
  logo: string;

  @ApiProperty({ type: 'string', required: true, default: 'description' })
  @IsString()
  description: string;
}
