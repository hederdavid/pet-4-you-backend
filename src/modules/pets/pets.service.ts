import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/plugins/database/services/prisma.service';

@Injectable()
export class PetsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPetDto: CreatePetDto) {
    return await this.prismaService.pet.create({
      data: {
        name: createPetDto.name,
        description: createPetDto.description,
        species: createPetDto.species,
        age: createPetDto.age,
        size: createPetDto.size,
        gender: createPetDto.gender,
        status: createPetDto.status ?? 'AVAILABLE',
        userId: createPetDto.userId,
        photos: {
          create: createPetDto.photos.map((photo) => ({ url: photo })),
        },
      },
      include: { photos: true },
    });
  }

  async findAll() {
    return await this.prismaService.pet.findMany({
      where: { deletedAt: null },
      include: {
        photos: { where: { deletedAt: null } },
        user: true,
      },
    });
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
      throw new NotFoundException(`Pet com id ${id} não encontrado ou foi removido.`);
    }

    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    await this.findOne(id);

    const { photos, ...petData } = updatePetDto;

    return await this.prismaService.pet.update({
      where: { id },
      data: {
        ...petData,
        ...(photos
          ? {
              photos: {
                deleteMany: { deletedAt: null },
                create: photos.map((url) => ({ url })),
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
}
