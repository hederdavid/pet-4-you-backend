import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsNotEmpty,
  MinLength,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  @IsNotEmpty({ message: 'O campo de e-mail não pode ser vazio.' })
  email: string;

  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O campo de nome não pode ser vazio.' })
  name: string;

  @IsString({ message: 'A senha deve ser um texto.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'O campo de senha não pode ser vazio.' })
  password: string;

  @IsString({ message: 'A cidade deve ser um texto.' })
  @IsNotEmpty({ message: 'O campo de cidade não pode ser vazio.' })
  city: string;

  @IsString({ message: 'O estado deve ser um texto.' })
  @Length(2, 2, { message: 'O estado deve ser uma sigla de 2 caracteres.' })
  @IsNotEmpty({ message: 'O campo de estado não pode ser vazio.' })
  state: string;

  @IsPhoneNumber('BR', { message: 'O formato do número de telefone é inválido.' })
  @IsNotEmpty({ message: 'O campo de telefone não pode ser vazio.' })
  phone: string;
}