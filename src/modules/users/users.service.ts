import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/plugins/database/services/prisma.service';
import { HashingServiceProtocol } from '../auth/hash/hashing.service';
import { UserResponseDto } from './dto/responses-user.dto';
import { PaginateService } from 'src/shared/services/paginate.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
    private readonly paginateService: PaginateService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    await this._validateUser(createUserDto.email, createUserDto.phone);
    createUserDto.password = await this.hashingService.hash(
      createUserDto.password,
    );
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll(
    page?: number,
    itemsPerPage?: number,
    name?: string,
    role?: string,
  ) {
    page = page ?? 1;
    itemsPerPage = itemsPerPage ?? 10;
    let querys: any = {};

    if (name) querys.name = { contains: name, mode: 'insensitive' };
    if (role) querys.filter = { field: 'role', value: role };
    
    return await this.paginateService.paginate({
      module: 'user',
      page,
      itemsPerPage,
      querys,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        state: true,
        phone: true,
        role: true,
        pets: true,
      }
    });
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prismaService.user.findFirst({
      where: { id, deletedAt: null },
    });
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.findOne(id);

    await this._validateUser(updateUserDto?.email, updateUserDto?.phone);

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

  private async _validateUser(email?: string, phone?: string) {
    if (email) await this._checkEmailExists(email);
    if (phone) await this._checkPhoneExists(phone);
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
