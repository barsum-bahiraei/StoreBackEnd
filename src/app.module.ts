import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './app/product/product.module';
import { CustomerModule } from './app/customer/customer.module';
import { SellerModule } from './app/seller/seller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './providers/database.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    ProductModule,
    CustomerModule,
    SellerModule,
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmConfigService],
})
export class AppModule {}
