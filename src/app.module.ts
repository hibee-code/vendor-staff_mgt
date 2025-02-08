import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './vendor/vendor.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [VendorModule, AuthModule, StaffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
