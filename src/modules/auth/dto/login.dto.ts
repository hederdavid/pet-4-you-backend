import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({}, {message: 'O e-mail informado não é válido.'})
    @IsNotEmpty({message: 'O campo de e-mail não pode ser vazio.'})
    email: string;

    @IsNotEmpty({message: 'O campo de senha não pode ser vazio.'})
    password: string;
}