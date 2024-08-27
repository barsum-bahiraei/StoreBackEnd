import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: +this.configService.get<number>('DATABASE_PORT', 1433),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      //password: 'D@Tabase43218765',
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [__dirname + '/../app/**/*.entity{.ts,.js}'],
      synchronize: true,
      options: {
        trustServerCertificate: true,
        encrypt: true,
      },
    };
  }
}
