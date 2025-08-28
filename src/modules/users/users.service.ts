import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/plugins/database/services/prisma.service';
import { HashingServiceProtocol } from '../auth/hash/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this._validateUser(createUserDto);
    createUserDto.password = await this.hashingService.hash(
      createUserDto.password,
    );
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
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email != user.email) {
      await this._checkEmailExists(updateUserDto.email);
    }

    if (updateUserDto.phone && updateUserDto.phone != user.phone) {
      await this._checkPhoneExists(updateUserDto.phone);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashingService.hash(
        updateUserDto.password,
      );
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
      throw new NotFoundException(
        `Usuário com id ${id} não encontrado ou já removido.`,
      );
    }

    return await this.prismaService.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private async _validateUser(createUserDto: CreateUserDto) {
    await this._checkEmailExists(createUserDto.email);
    await this._checkPhoneExists(createUserDto.phone);
  }

  private async _checkEmailExists(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email, deletedAt: null },
    });

    if (user) {
      throw new ConflictException(
        `Já existe um usuário cadastrado com o e-mail inserido.`,
      );
    }
  }

  private async _checkPhoneExists(phone: string) {
    const user = await this.prismaService.user.findFirst({
      where: { phone, deletedAt: null },
    });

    if (user) {
      throw new ConflictException(
        `Já existe um usuário cadastrado com o telefone inserido.`,
      );
    }
  }
}
