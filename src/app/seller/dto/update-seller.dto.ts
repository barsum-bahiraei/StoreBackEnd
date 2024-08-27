import { CreateSellerDto } from './create-seller.dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateSellerDto extends IntersectionType(CreateSellerDto) {
  @ApiProperty({ type: 'number', required: true, default: 0 })
  @IsNumber()
  id: number;
}
