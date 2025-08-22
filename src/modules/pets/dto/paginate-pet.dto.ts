import {
  IsUppercase,
  IsOptional,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PetStatus, PublicationStatus } from 'generated/prisma';

export class PaginatePetDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber(undefined, {
    message: 'O número da página tem que ser um número inteiro!',
  })
  readonly page?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber(undefined, {
    message: 'O número de itens por página tem que ser um número inteiro!',
  })
  readonly itemsPerPage?: number;

  @IsOptional()
  @IsString({ message: 'O nome do usuário tem que ser uma String' })
  readonly name?: string;

  @IsOptional()
  @IsUppercase({ message: 'O status tem que estar em letras maiúsculas!' })
  @IsEnum(PetStatus, { message: 'Informe um status valido!' })
  readonly pet_status?: PetStatus;

  @IsOptional()
  @IsUppercase({ message: 'O status tem que estar em letras maiúsculas!' })
  @IsEnum(PublicationStatus, { message: 'Informe um status valido!' })
  readonly publication_status?: PublicationStatus;
}
