import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { ApiCreateOperation } from 'src/common/documentation';
import {
  CreateUserResponseDto,
  FindAllUsersResponseDto,
  FindOneUserResponseDto,
  RemoveUserResponseDto,
  UpdateUserResponseDto,
} from './dto/responses-user.dto';
import { PaginateUserDto } from './dto/paginate-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreateOperation(
    {
      summary: 'Cria um novo usuário.',
      description: 'Cria um novo usuário com as informações fornecidas.',
    },
    CreateUserResponseDto,
  )
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return {
      statusCode: 201,
      message: 'Usuário criado com sucesso.',
      user,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async findAll(
    @Query() queryParams?: PaginateUserDto,
  ): Promise<FindAllUsersResponseDto> {
    const { page, itemsPerPage, name, role } = queryParams || {};
    const { items: users, meta } = await this.usersService.findAll(
      page,
      itemsPerPage,
      name,
      role,
    );
    return {
      statusCode: 200,
      message: 'Usuários retornados com sucesso.',
      users,
      meta,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindOneUserResponseDto> {
    const user = await this.usersService.findOne(id);
    return {
      statusCode: 200,
      message: 'Usuário encontrado com sucesso.',
      user,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return {
      statusCode: 200,
      message: 'Usuário atualizado com sucesso.',
      user: updatedUser,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<RemoveUserResponseDto> {
    await this.usersService.remove(id);
    return {
      statusCode: 200,
      message: 'Usuário removido com sucesso.',
    };
  }
}
