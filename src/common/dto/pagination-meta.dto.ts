import { ApiProperty } from "@nestjs/swagger";

export class PaginationMetaDto {
  @ApiProperty({ example: 35 })
  readonly totalItems: number;

  @ApiProperty({ example: 10 })
  readonly itemsPerPage: number;

  @ApiProperty({ example: 4 })
  readonly totalPages: number;

  @ApiProperty({ example: 2 })
  readonly currentPage: number;
}
