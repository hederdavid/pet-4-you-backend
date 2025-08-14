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
  name: string;

  @IsString({ message: 'A descrição deve ser um texto.' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @Length(10, 500, {
    message: 'A descrição deve ter entre 10 e 500 caracteres.',
  })
  description: string;

  @IsEnum(PetSpecies, {
    message: 'Espécie inválida. Valores aceitos: DOG, CAT, BIRD.',
  })
  species: PetSpecies;

  @IsEnum(PetAge, {
    message: 'Idade inválida. Valores aceitos: PUPPY, ADULT, SENIOR.',
  })
  age: PetAge;

  @IsEnum(PetSize, {
    message: 'Tamanho inválido. Valores aceitos: SMALL, MEDIUM, LARGE.',
  })
  size: PetSize;

  @IsEnum(PetGender, {
    message: 'Gênero inválido. Valores aceitos: MALE, FEMALE.',
  })
  gender: PetGender;

  @IsString({ message: 'A data de publicação deve ser uma string.' })
  @IsOptional()
  publication_date: string;

  @IsUUID('all', { message: 'O userId deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O userId é obrigatório.' })
  userId: string;
}
