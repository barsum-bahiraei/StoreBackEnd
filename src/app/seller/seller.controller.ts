import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('create')
  async create(@Body() createSellerDto: CreateSellerDto) {
    return await this.sellerService.create(createSellerDto);
  }

  @Get('find-all')
  findAll() {
    return this.sellerService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(+id);
  }

  @Put('update')
  update(@Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(updateSellerDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sellerService.remove(+id);
  // }
}
