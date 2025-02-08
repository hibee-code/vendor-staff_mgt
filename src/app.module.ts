import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './vendor/vendor.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [VendorModule, AuthModule, StaffModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
