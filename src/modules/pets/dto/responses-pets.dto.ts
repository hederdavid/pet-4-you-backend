import { ApiProperty } from '@nestjs/swagger';
import {
  PetAge,
  PetGender,
  PetSize,
  PetSpecies,
  PetStatus,
  PublicationStatus,
} from 'generated/prisma';
import { ApiResponseDto } from 'src/shared/dtos/api-response.dto';

export class PhotoResponseDto {
  @ApiProperty({ example: '00e8fcd5-ccec-4c56-998a-0d5a5396154e' })
  readonly id: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  readonly url: string;

  @ApiProperty({ example: '00e8fcd5-ccec-4c56-998a-0d5a5396154e' })
  readonly petId: string;
}

export class PetResponseDto {
  @ApiProperty({ example: '00e8fcd5-ccec-4c56-998a-0d5a5396154e' })
  readonly id: string;

  @ApiProperty({ example: 'Rex' })
  readonly name: string;

  @ApiProperty({ example: 'Um cachorro muito amigável.' })
  readonly description: string;

  @ApiProperty({ example: PetSpecies.DOG })
  readonly species: PetSpecies;

  @ApiProperty({ example: PetAge.PUPPY })
  readonly age: PetAge;

  @ApiProperty({ example: PetSize.MEDIUM })
  readonly size: PetSize;

  @ApiProperty({ example: PetGender.MALE })
  readonly gender: PetGender;

  @ApiProperty({ example: PetStatus.AVAILABLE })
  readonly pet_status: PetStatus;

  readonly publication_status: PublicationStatus;

  @ApiProperty({ example: '2023-03-15T12:00:00Z' })
  readonly publication_date: Date;

  @ApiProperty({ example: '2023-03-15T12:00:00Z' })
  readonly createdAt: Date;

  @ApiProperty({ example: '2023-03-15T12:00:00Z' })
  readonly updatedAt: Date;

  @ApiProperty({ example: '2023-03-15T12:00:00Z' })
  readonly deletedAt: Date | null;

  @ApiProperty({ example: '00e8fcd5-ccec-4c56-998a-0d5a5396154e' })
  readonly userId: string;

  @ApiProperty({ type: [PhotoResponseDto] })
  photos: PhotoResponseDto[];
}

export class CreatePetResponseDto extends ApiResponseDto<PetResponseDto> {
  @ApiProperty({ type: PetResponseDto })
  declare data: PetResponseDto;
}

export class UpdatePetResponseDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;

  @ApiProperty({ example: 'Pet atualizado com sucesso!' })
  readonly message: string;

  @ApiProperty({ type: PetResponseDto })
  readonly pet: PetResponseDto;
}

export class DeletePetResponseDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;

  @ApiProperty({ example: 'Pet deletado com sucesso!' })
  readonly message: string;
}

export class SearchAllPetsResponseDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;

  @ApiProperty({ example: 'Pets encontrados com sucesso!' })
  readonly message: string;

  @ApiProperty({ type: [PetResponseDto] })
  readonly pets: PetResponseDto[];

  @ApiProperty({ example: 6 })
  readonly maxPag: number;
}
