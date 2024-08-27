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
  async create(createSellerDto: CreateSellerDto): Promise<SellerEntity> {
    const seller = new SellerEntity();
    seller.name = createSellerDto.name;
    seller.family = createSellerDto.family;
    seller.age = createSellerDto.age;
    return await this.sellerRepository.save(seller);
  }

  async findAll(): Promise<SellerEntity[]> {
    return await this.sellerRepository.find();
  }

  async findOne(id: number): Promise<SellerEntity> {
    return await this.sellerRepository.findOneBy({
      id: id,
    });
  }

  async update(updateSellerDto: UpdateSellerDto): Promise<SellerEntity> {
    const seller: SellerEntity = await this.sellerRepository.findOneBy({
      id: updateSellerDto.id,
    });
    seller.name = updateSellerDto.name;
    seller.family = updateSellerDto.family;
    seller.age = updateSellerDto.age;
    return await this.sellerRepository.save(seller);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} seller`;
  // }
}
