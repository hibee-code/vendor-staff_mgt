import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async create(vendorId: string, createStaffDto: CreateStaffDto) {
    // Check if vendor exists
    const vendor = await this.prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    // Check if email is already in use
    const existingStaff = await this.prisma.staff.findUnique({
      where: { email: createStaffDto.email },
    });

    if (existingStaff) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await hash(createStaffDto.password, 10);

    return this.prisma.staff.create({
      data: {
        ...createStaffDto,
        password: hashedPassword,
        vendorId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        position: true,
        vendorId: true,
      },
    });
  }

  async findAllByVendor(vendorId: string) {
    // Check if vendor exists
    const vendor = await this.prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return this.prisma.staff.findMany({
      where: { vendorId },
      select: {
        id: true,
        name: true,
        email: true,
        position: true,
      },
    });
  }
}