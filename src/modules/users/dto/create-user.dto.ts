import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsNotEmpty,
  MinLength,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O campo de nome não pode ser vazio.' })
  @ApiProperty({ description: 'Nome completo do usuário' })
  readonly name: string;

  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  @IsNotEmpty({ message: 'O campo de e-mail não pode ser vazio.' })
  @ApiProperty({ description: 'E-mail do usuário' })
  readonly email: string;

  @IsString({ message: 'A senha deve ser um texto.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'O campo de senha não pode ser vazio.' })
  @ApiProperty({ description: 'Senha do usuário' })
  password: string;

  @IsString({ message: 'O estado deve ser um texto.' })
  @Length(2, 2, { message: 'O estado deve ser uma sigla de 2 caracteres.' })
  @IsNotEmpty({ message: 'O campo de estado não pode ser vazio.' })
  @ApiProperty({ description: 'Estado do usuário' })
  readonly state: string;

  @IsString({ message: 'A cidade deve ser um texto.' })
  @IsNotEmpty({ message: 'O campo de cidade não pode ser vazio.' })
  @ApiProperty({ description: 'Cidade do usuário' })
  readonly city: string;

  @IsPhoneNumber('BR', {
    message: 'O formato do número de telefone é inválido.',
  })
  @IsNotEmpty({ message: 'O campo de telefone não pode ser vazio.' })
  @ApiProperty({ description: 'Telefone do usuário' })
  readonly phone: string;
}
