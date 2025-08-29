import {
  IsUppercase,
  IsOptional,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PaginateUserDto {
  @ApiProperty({
    required: false,
    description: 'Numeração da página da requisição.',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber(undefined, {
    message: 'O número da página tem que ser um número inteiro!',
  })
  readonly page?: number;

  @ApiProperty({
    required: false,
    description: 'Quantidade de itens por página...',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber(undefined, {
    message: 'O número de itens por página tem que ser um número inteiro!',
  })
  readonly itemsPerPage?: number;

  @ApiProperty({
    required: false,
    description: 'Filtro por nome do usuário...',
  })
  @IsOptional()
  @IsString({ message: 'O nome do usuário tem que ser uma String' })
  readonly name?: string;

  @ApiProperty({
    required: false,
    description: 'Filtro por nível de acesso do usuário.',
    enum: UserRole,
  })
  @IsOptional()
  @IsUppercase({
    message: 'O nível de acesso tem que estar em letras maiúsculas!',
  })
  @IsEnum(UserRole, { message: 'Informe um nível de acesso valido!' })
  readonly role?: UserRole;
}
