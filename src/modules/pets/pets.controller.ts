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
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { PaginatePetDto } from './dto/paginate-pet.dto';
import { ApiCreateOperation, ApiFindOperation, ApiRemoveOperation, ApiUpdateOperation } from 'src/common/documentation';
import {
  CreatePetResponseDto,
  FindAllPetsResponseDto,
  FindOnePetResponseDto,
  RemovePetResponseDto,
  UpdatePetResponseDto,
} from './dto/responses-pets.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiCreateOperation(
    {
      summary: 'Cria um novo pet.',
      description: 'Cria um novo pet com as informações fornecidas.',
    },
    CreatePetResponseDto,
  )
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Body() createPetDto: CreatePetDto,
  ): Promise<CreatePetResponseDto> {
    return await this.petsService.create(createPetDto);
  }


  @ApiFindOperation(
    {
      summary: 'Retorna uma lista de pets.',
      description: 'Retorna uma lista paginada de pets com base nos filtros fornecidos.',
    },
    FindAllPetsResponseDto,
  )
  @Get()
  async findAll(
    @Query() queryParams?: PaginatePetDto,
  ): Promise<FindAllPetsResponseDto> {
    const { page, itemsPerPage, name, pet_status, publication_status } =
      queryParams || {};
    return await this.petsService.findAll(
      page,
      itemsPerPage,
      name,
      pet_status,
      publication_status,
    );
  }

  @ApiFindOperation(
    {
      summary: 'Retorna um pet pelo ID.',
      description: 'Retorna um pet específico com base no ID fornecido.',
    },
    FindOnePetResponseDto,
  )
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindOnePetResponseDto> {
    const pet = await this.petsService.findOne(id);
    return {
      statusCode: 200,
      message: 'Pet encontrado com sucesso!',
      pet,
    };
  }

  @ApiUpdateOperation(
    {
      summary: 'Atualiza um pet pelo ID.',
      description: 'Atualiza as informações de um pet específico com base no ID fornecido.',
    },
    UpdatePetResponseDto,
  )
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<UpdatePetResponseDto> {
    const updatedPet = await this.petsService.update(id, updatePetDto);
    return {
      statusCode: 200,
      message: 'Pet atualizado com sucesso!',
      pet: updatedPet,
    };
  }

  @ApiRemoveOperation(
    {
      summary: 'Remove um pet pelo ID.',
      description: 'Remove um pet específico com base no ID fornecido.',
    },
    RemovePetResponseDto,
  )
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<RemovePetResponseDto> {
    await this.petsService.remove(id);
    return {
      statusCode: 200,
      message: 'Pet deletado com sucesso!',
    };
  }

  @ApiFindOperation(
    {
      summary: 'Retorna uma lista de pets por dono.',
      description: 'Retorna uma lista paginada de pets pertencentes a um dono específico.',
    },
    FindAllPetsResponseDto,
  )
  @UseGuards(AccessTokenGuard)
  @Get('/user/:id')
  findByOwner(@Param('id') id: string, @Query() queryParams?: PaginatePetDto) {
    const { page, itemsPerPage, name, pet_status, publication_status } =
      queryParams || {};
    return this.petsService.findPetsByOwner(
      id,
      page,
      itemsPerPage,
      name,
      pet_status,
      publication_status,
    );
  }
}
