import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          isGlobal: true,
          signOptions: { expiresIn: '1d' },
          secret: configService.get<string>('SECRET_KEY'),
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
