import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './entities/user.entity';
import { Authenticate } from './decorators/authenticate.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @Get('detail')
  @Authenticate()
  findOne(@User() user: UserEntity) {
    return this.userService.findOne(user.email);
  }

  @Authenticate()
  @Put('update')
  update(@User() user: UserEntity, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user, updateUserDto);
  }
}
