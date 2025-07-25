import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/plugins/database/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
