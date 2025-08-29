import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "generated/prisma";
import { PetResponseDto } from "src/modules/pets/dto/responses-pets.dto";

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
  readonly pets: PetResponseDto[];
}
