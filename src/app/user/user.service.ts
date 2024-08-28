import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createHmac } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { ResponseFilter } from '../../infrastructure/filters/response.filter';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

  async findOne(email: string) {
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    if (!user.confirmEmail) {
      return new ResponseFilter(200, 'email is not confirmed', null);
    }
    return new ResponseFilter(200, null, user);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findOne(loginUserDto.email);
    if (!user.data) {
      return new ResponseFilter(400, 'email or password is wrong', null);
    }
    if (user.data.password != this.hashPassword(loginUserDto.password)) {
      return new ResponseFilter(200, 'email or password is wrong', null);
    }
    const token = this.jwtService.signAsync(user.data.email);
    return new ResponseFilter(200, null, token);
  }

  // findOne() {
  //   return `This action returns a #${1} user`;
  // }

  private hashPassword(password: string) {
    const key = this.configService.get<string>('PASSWORD_SECRET_KEY');
    return createHmac('sha256', key).update(password).digest('hex');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
