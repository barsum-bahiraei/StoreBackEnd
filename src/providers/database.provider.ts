import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'D@Tabase43218765',
      database: 'Store',
      entities: [__dirname + 'app/**/*.entity{.ts,.js}'],
      synchronize: true,
      options: {
        trustServerCertificate: true,
        encrypt: true,
      },
    };
  }
}
