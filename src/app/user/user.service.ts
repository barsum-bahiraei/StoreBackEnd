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
    const { data } = await this.findOne(createUserDto.email);
    if (data) {
      return new ResponseFilter(400, 'user exist', null);
    }
    const user: UserEntity = this.userRepository.create({
      name: createUserDto.name,
      family: createUserDto.family,
      age: createUserDto.age,
      email: createUserDto.email,
      confirmEmail: false,
      password: this.hashPassword(createUserDto.password),
    });
    await this.userRepository.save(user);
    return new ResponseFilter(200, null, user);
  }

  async findOne(email: string): Promise<ResponseFilter<UserEntity>> {
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    if (!user) {
      return new ResponseFilter(200, 'user not exist', user);
    }
    if (!user.confirmEmail) {
      return new ResponseFilter(200, 'email is not confirmed', null);
    }
    return new ResponseFilter(200, null, user);
  }

  async login(loginUserDto: LoginUserDto): Promise<ResponseFilter<string>> {
    const user = await this.findOne(loginUserDto.email);
    if (!user.data) {
      return new ResponseFilter(400, 'email or password is wrong', null);
    }
    if (user.data.password != this.hashPassword(loginUserDto.password)) {
      return new ResponseFilter(200, 'email or password is wrong', null);
    }
    const token = await this.jwtService.signAsync({
      email: user.data.email,
    });
    return new ResponseFilter(200, null, token);
  }

  private hashPassword(password: string): string {
    const key = this.configService.get<string>('PASSWORD_SECRET_KEY');
    return createHmac('sha256', key).update(password).digest('hex');
  }

  async update(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseFilter<UserEntity>> {
    user.name = updateUserDto.name;
    user.family = updateUserDto.family;
    user.age = updateUserDto.age;
    user.password = this.hashPassword(updateUserDto.password);
    await this.userRepository.save(user);
    return new ResponseFilter(200, null, user);
  }
}
