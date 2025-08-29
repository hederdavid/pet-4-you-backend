import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/plugins/database/services/prisma.service';
import { PetStatus, PublicationStatus } from 'generated/prisma';
import { PaginateService } from 'src/shared/services/paginate.service';
import { CreatePetResponseDto } from './dto/responses-pets.dto';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class PetsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginateService: PaginateService,
    private readonly logger: Logger
  ) {}

  async create(createPetDto: CreatePetDto): Promise<CreatePetResponseDto> {
    try {
      const pet = await this.prismaService.pet.create({
        data: {
          name: createPetDto.name,
          description: createPetDto.description,
          species: createPetDto.species,
          age: createPetDto.age,
          size: createPetDto.size,
          gender: createPetDto.gender,
          userId: createPetDto.userId,
          photos: {
            create: createPetDto.photos.map((photoUrl) => ({
              url: photoUrl,
            })),
          },
        },
        include: { photos: true },
      });

      return new CreatePetResponseDto(201, 'Pet criado com sucesso!', pet);
    } catch (error) {
      this.logger.error(error);

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Já existe um pet com estes dados.');
        }
      }

      throw new InternalServerErrorException('Não foi possível criar o pet.');
    }
  }

  async findAll(
    page?: number,
    itemsPerPage?: number,
    name?: string,
    pet_status?: PetStatus,
    publication_status?: PublicationStatus,
  ) {
    page = page ?? 1;
    itemsPerPage = itemsPerPage ?? 10;

    try {
      let querys = {};

      if (name) {
        querys = Object.assign(querys, {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        });
      }

      if (pet_status) {
        querys = Object.assign(querys, {
          pet_status: {
            equals: pet_status,
          },
        });
      }

      if (publication_status) {
        querys = Object.assign(querys, {
          publication_status: {
            equals: publication_status,
          },
        });
      }

      querys = Object.assign(querys, {
        deletedAt: null,
      });

      if (page && itemsPerPage && querys) {
        return this.paginateService.paginate({
          module: 'pet',
          page,
          itemsPerPage,
          querys,
          select: {
            id: true,
            name: true,
            species: true,
            age: true,
            size: true,
            gender: true,
            pet_status: true,
            publication_status: true,
            publication_date: true,
            userId: true,
            photos: {
              select: {
                id: true,
                url: true,
              },
            },
            user: true,
          },
        });
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Erro ao listar pets. ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    const pet = await this.prismaService.pet.findFirst({
      where: { id, deletedAt: null },
      include: {
        photos: { where: { deletedAt: null } },
        user: true,
      },
    });

    if (!pet) {
      throw new NotFoundException(
        `Pet com id ${id} não encontrado ou foi removido.`,
      );
    }

    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    await this.findOne(id);

    const { userId, photos, ...updateData } = updatePetDto;

    return await this.prismaService.pet.update({
      where: { id },
      data: {
        ...updateData,
        ...(photos && photos.length > 0
          ? {
              photos: {
                deleteMany: {},
                create: photos.map((photoUrl) => ({
                  url: photoUrl,
                })),
              },
            }
          : {}),
      },
      include: {
        photos: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prismaService.photo.updateMany({
      where: { petId: id, deletedAt: null },
      data: { deletedAt: new Date() },
    });

    return await this.prismaService.pet.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findPetsByOwner(
    ownerId: string,
    page?: number,
    itemsPerPage?: number,
    name?: string,
    pet_status?: PetStatus,
    publication_status?: PublicationStatus,
  ) {
    page = page ?? 1;
    itemsPerPage = itemsPerPage ?? 10;

    try {
      let querys = {};

      if (ownerId) {
        querys = Object.assign(querys, {
          userId: {
            equals: ownerId,
          },
        });
      }

      if (name) {
        querys = Object.assign(querys, {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        });
      }

      if (pet_status) {
        querys = Object.assign(querys, {
          pet_status: {
            equals: pet_status,
          },
        });
      }

      if (publication_status) {
        querys = Object.assign(querys, {
          publication_status: {
            equals: publication_status,
          },
        });
      }

      querys = Object.assign(querys, {
        deletedAt: null,
      });

      if (page && itemsPerPage && querys) {
        return this.paginateService.paginate({
          module: 'pet',
          page,
          itemsPerPage,
          querys,
          select: {
            id: true,
            name: true,
            species: true,
            age: true,
            size: true,
            gender: true,
            pet_status: true,
            publication_status: true,
            publication_date: true,
            userId: true,
            photos: {
              select: {
                id: true,
                url: true,
              },
            },
          },
        });
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Erro ao listar pets. ${error.message}`,
      );
    }
  }
}
