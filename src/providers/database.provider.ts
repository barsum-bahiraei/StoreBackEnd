import {Injectable} from "@nestjs/common";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return {
            type: 'mssql',
            host: 'localhost',
            port: 1433,
            username: 'sa',
            password: 'database1234',
            database: 'Store',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            options: {
                trustServerCertificate: true,
                encrypt: true,
            }
        }
    }

}