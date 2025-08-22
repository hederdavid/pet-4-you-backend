import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PaginatePetDto } from './dto/paginate-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(
    FilesInterceptor('photos', 5, {
      storage: diskStorage({
        destination: '../pet-4-you-frontend/public/uploads', // pasta onde vai salvar
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  @Post()
  create(
    @Body() createPetDto: CreatePetDto,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    return this.petsService.create(createPetDto, photos);
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
  @UseInterceptors(
    FilesInterceptor('photos', 5, {
      storage: diskStorage({
        destination: '../pet-4-you-frontend/public/uploads', // pasta onde vai salvar
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    return this.petsService.update(id, updatePetDto, photos);
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
