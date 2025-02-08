import { Injectable, ConflictException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateVendorDto } from './dto/vendor.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async create(createVendorDto: CreateVendorDto) {
    const existingVendor = await this.prisma.vendor.findFirst({
      where: {
        OR: [
          { email: createVendorDto.email },
          { name: createVendorDto.name },
        ],
      },
    });

    if (existingVendor) {
      throw new ConflictException('Email or name already exists');
    }

    const hashedPassword = await hash(createVendorDto.password, 10);

    return this.prisma.vendor.create({
      data: {
        ...createVendorDto,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  findAll() {
    return this.prisma.vendor.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
