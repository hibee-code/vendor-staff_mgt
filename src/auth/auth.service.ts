import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async register(authUser: SignUpDto) {
    try {
      const { passwordHash, ...userDetails } = authUser;

      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: authUser.email,
        },
      });

      if (existingUser) {
        throw new ConflictException('User already exists');
      }
      const hashedPassword = await bcrypt.hash(passwordHash, 10);
      const newUser = await this.prisma.user.create({
        data: {
          ...userDetails,
          passwordHash: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        },
      });

      return newUser;
    } catch (error: unknown) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Unexpected error during registration:', error);
      throw new InternalServerErrorException('An error occurred while registering');
    }
    }
    async validateUser(email: string, password: string): Promise<any> {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (user && (await bcrypt.compare(password, user.passwordHash))) {
        const { passwordHash, ...result } = user;
        return result;
      }
      throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
    
