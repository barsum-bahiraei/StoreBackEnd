import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerEntity } from './entities/seller.entity';
import { ResponseFilter } from '../../infrastructure/filters/response.filter';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(SellerEntity)
    private readonly sellerRepository: Repository<SellerEntity>,
  ) {}
  async create(createSellerDto: CreateSellerDto): Promise<SellerEntity> {
    const seller = new SellerEntity();
    seller.name = createSellerDto.name;
    seller.description = createSellerDto.description;
    seller.latitude = createSellerDto.latitude;
    seller.longitude = createSellerDto.longitude;
    seller.logo = createSellerDto.logo;
    return await this.sellerRepository.save(seller);
  }

  async findAll(): Promise<ResponseFilter<SellerEntity[]>> {
    const data = await this.sellerRepository.find();
    return new ResponseFilter(200, null, data);
  }

  async findOne(id: number): Promise<ResponseFilter<SellerEntity>> {
    const data = await this.sellerRepository.findOneBy({
      id: id,
    });
    return new ResponseFilter(200, null, data);
  }

  async update(
    updateSellerDto: UpdateSellerDto,
  ): Promise<ResponseFilter<SellerEntity>> {
    const seller: SellerEntity = await this.sellerRepository.findOneBy({
      id: updateSellerDto.id,
    });
    seller.name = updateSellerDto.name;
    const data = await this.sellerRepository.save(seller);
    return new ResponseFilter(200, null, data);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} seller`;
  // }
}
