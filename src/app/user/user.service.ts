import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createHmac } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { ResponseFilter } from '../../infrastructure/filters/response.filter';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}
  async create(
    createUserDto: CreateUserDto,
  ): Promise<ResponseFilter<UserEntity>> {
    const hasUser = await this.findOne(createUserDto.email);
    if (hasUser) {
      return new ResponseFilter(400, 'user exist', null);
    }
    const user: UserEntity = this.userRepository.create({
      name: createUserDto.name,
      family: createUserDto.family,
      age: createUserDto.age,
      email: createUserDto.email,
      password: this.hashPassword(createUserDto.password),
    });
    await this.userRepository.save(user);
    return new ResponseFilter(200, null, user);
  }

  private hashPassword(password: string) {
    const key = this.configService.get<string>('PASSWORD_SECRET_KEY');
    return createHmac('sha256', key).update(password).digest('hex');
  }

  async findOne(email: string) {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }

  // findOne() {
  //   return `This action returns a #${1} user`;
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
