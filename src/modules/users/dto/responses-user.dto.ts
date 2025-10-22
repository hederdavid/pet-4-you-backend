import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma';
import { PaginationMetaDto } from 'src/common/dto/pagination-meta.dto';
import { PetResponseDto } from 'src/modules/pets/dto/responses-pets.dto';

export class UserResponseDto {
  @ApiProperty({ example: '00e8fcd5-ccec-4c56-998a-0d5a5396154e' })
  readonly id: string;

  @ApiProperty({ example: 'Heder Moreira David' })
  readonly name: string;

  @ApiProperty({ example: 'hedermd6@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: 'Vitória da Conquista' })
  readonly city: string;

  @ApiProperty({ example: 'Bahia' })
  readonly state: string;

  @ApiProperty({ example: '(77) 99160-7631' })
  readonly phone: string;

  @ApiProperty({ example: UserRole.ADMIN })
  readonly role: UserRole;

  @ApiProperty({ type: [PetResponseDto] })
  readonly pets?: PetResponseDto[];
}

export class CreateUserResponseDto {
  @ApiProperty({ example: 201 })
  readonly statusCode: number;

  @ApiProperty({ example: 'Usuário criado com sucesso.' })
  readonly message: string;

  @ApiProperty({ type: UserResponseDto })
  readonly user: UserResponseDto;
}

export class FindAllUsersResponseDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;

  @ApiProperty({ example: 'Usuários retornados com sucesso.' })
  readonly message: string;

  @ApiProperty({ type: [UserResponseDto] })
  readonly users: UserResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  readonly meta: PaginationMetaDto;
}

export class FindOneUserResponseDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;

  @ApiProperty({ example: 'Usuário encontrado com sucesso.' })
  readonly message: string;

  @ApiProperty({ type: UserResponseDto })
  readonly user: UserResponseDto;
}

export class UpdateUserResponseDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;

  @ApiProperty({ example: 'Usuário atualizado com sucesso.' })
  readonly message: string;

  @ApiProperty({ type: UserResponseDto })
  readonly user: UserResponseDto;
}

export class RemoveUserResponseDto {
  @ApiProperty({ example: 200 })
  readonly statusCode: number;
  
  @ApiProperty({ example: 'Usuário removido com sucesso.' })
  readonly message: string;
}
