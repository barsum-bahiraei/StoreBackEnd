import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './app/product/product.module';
import { CustomerModule } from './app/customer/customer.module';
import { SellerModule } from './app/seller/seller.module';

@Module({
  imports: [ProductModule, CustomerModule, SellerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
