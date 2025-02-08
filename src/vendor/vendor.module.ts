import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { VendorsController } from './vendor.controller';
import { VendorsService } from './vendor.service';


@Module({
  imports: [PrismaModule],
  controllers: [VendorsController],
  providers: [VendorsService],
})
export class VendorModule {}
