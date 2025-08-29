import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Operação realizada com sucesso!' })
  message: string;

  constructor(statusCode: number, message: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    if (data) {
      this.data = data;
    }
  }

  data?: T;
}
