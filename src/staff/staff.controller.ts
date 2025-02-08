import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffService } from './staff.service';

@Controller('api/vendors')
export class StaffController {
    constructor(private readonly staffService: StaffService) {}
    @Post(':vendorId/staff')
    async createStaff(
        @Param('vendorId') vendorId: string,
        @Body() createStaffDto: CreateStaffDto,
    ) {
        return this.staffService.create(vendorId, createStaffDto);
}     @Get(':vendorId/staff')
    async findAllByVendor(@Param('vendorId') vendorId: string) {
    return this.staffService.findAllByVendor(vendorId);
}


}
