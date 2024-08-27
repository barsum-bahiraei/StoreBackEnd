import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerEntity } from './entities/seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity])],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
