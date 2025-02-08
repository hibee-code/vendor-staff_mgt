import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateVendorDto } from './dto/vendor.dto';
import { VendorsService } from './vendor.service';

@Controller('api/vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  // Create a new vendor
  @Post('vendor')
  async createVendor(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.create(createVendorDto);
  }

  // Get all vendors
  @Get('vendors')
  async findAllVendors() {
    return this.vendorsService.findAll();
  }
}
