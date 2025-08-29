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
import { ApiCreateOperation } from 'src/common/documentation';
import { CreatePetResponseDto } from './dto/responses-pets.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiCreateOperation({
    summary: 'Cria um novo pet.',
    description: 'Cria um novo pet com as informações fornecidas.'
  }, CreatePetResponseDto)
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createPetDto: CreatePetDto): Promise<CreatePetResponseDto> {
    return this.petsService.create(createPetDto);
  }

  @Get()
  findAll(@Query() queryParams?: PaginatePetDto) {
    const { page, itemsPerPage, name, pet_status, publication_status } =
      queryParams || {};
    return this.petsService.findAll(
      page,
      itemsPerPage,
      name,
      pet_status,
      publication_status,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }

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
