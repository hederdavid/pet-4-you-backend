import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsUUID,
  Length,
  IsArray,
  ArrayMinSize,
  IsUrl,
} from 'class-validator';
import {
  PetAge,
  PetGender,
  PetSize,
  PetSpecies,
  PetStatus,
} from 'generated/prisma';

export class CreatePetDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome do pet é obrigatório.' })
  @Length(2, 50, { message: 'O nome deve ter entre 2 e 50 caracteres.' })
  @ApiProperty({ example: 'Rex' })
  readonly name: string;

  @IsString({ message: 'A descrição deve ser um texto.' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @Length(10, 500, {
    message: 'A descrição deve ter entre 10 e 500 caracteres.',
  })
  @ApiProperty({ example: 'Um cachorro muito fofo.' })
  readonly description: string;

  @IsEnum(PetSpecies, {
    message: 'Espécie inválida. Valores aceitos: DOG, CAT, BIRD.',
  })
  @ApiProperty({ example: PetSpecies.DOG })
  readonly species: PetSpecies;

  @IsEnum(PetAge, {
    message: 'Idade inválida. Valores aceitos: PUPPY, ADULT, SENIOR.',
  })
  @ApiProperty({ example: PetAge.PUPPY })
  readonly age: PetAge;

  @IsEnum(PetSize, {
    message: 'Tamanho inválido. Valores aceitos: SMALL, MEDIUM, LARGE.',
  })
  @ApiProperty({ example: PetSize.MEDIUM })
  readonly size: PetSize;

  @IsEnum(PetGender, {
    message: 'Gênero inválido. Valores aceitos: MALE, FEMALE.',
  })
  @ApiProperty({ example: PetGender.MALE })
  readonly gender: PetGender;

  @IsString({ message: 'A data de publicação deve ser uma string.' })
  @IsOptional()
  @ApiProperty({ example: '2025-08-08' })
  readonly publication_date: string;

  @IsUUID('all', { message: 'O userId deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O userId é obrigatório.' })
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  readonly userId: string;

  @IsArray({ message: 'As fotos devem ser um array de URLs.' })
  @IsUrl({}, { each: true, message: 'Cada foto deve ser uma URL válida.' })
  @ArrayMinSize(1, { message: 'É necessário enviar pelo menos uma foto.' })
  @ApiProperty({ example: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'] })
  readonly photos: string[];
}
