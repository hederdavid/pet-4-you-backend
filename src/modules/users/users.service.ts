import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/plugins/database/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      where: { deletedAt: null },
    });
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id, deletedAt: null },
    });
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado ou foi removido.`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.prismaService.user.findFirst({
      where: { id, deletedAt: null },
    });
    if (!userExists) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado ou foi removido.`);
    }

    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    const userExists = await this.prismaService.user.findFirst({
      where: { id, deletedAt: null },
    });
    if (!userExists) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado ou já removido.`);
    }

    return await this.prismaService.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
