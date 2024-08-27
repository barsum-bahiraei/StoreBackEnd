import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerEntity } from './entities/seller.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(SellerEntity)
    private readonly sellerRepository: Repository<SellerEntity>,
  ) {}
  async create(createSellerDto: CreateSellerDto) {
    const seller = new SellerEntity();
    seller.name = createSellerDto.name;
    seller.family = createSellerDto.family;
    seller.age = createSellerDto.age;
    return await this.sellerRepository.save(seller);
  }

  async findAll(): Promise<SellerEntity[]> {
    return await this.sellerRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
