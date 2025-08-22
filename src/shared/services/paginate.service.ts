import {
  InternalServerErrorException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/plugins/database/services/prisma.service';

interface propsType {
  module: string;
  page: number;
  itemsPerPage: number;
  querys?: Record<string, any>;
  include?: object;
  orderBy?: object;
  select?: object;
}

@Injectable()
export class PaginateService {
  constructor(private prisma: PrismaService) {}

  async paginate({
    module,
    page,
    itemsPerPage,
    querys,
    include,
    orderBy,
    select,
  }: propsType) {
    try {
      const totalItems = await this.prisma[module].count({ where: querys });

      // Otimizado para retornar a estrutura completa mesmo quando não há itens
      if (totalItems === 0) {
        return {
          items: [],
          meta: {
            totalItems: 0,
            itemsPerPage: itemsPerPage === -1 ? 0 : itemsPerPage,
            totalPages: 0,
            currentPage: page,
          },
        };
      }

      let paginationConfig = {};

      if (itemsPerPage !== -1) {
        const skip = Number(itemsPerPage * (page - 1));
        paginationConfig = {
          skip,
          take: Number(itemsPerPage),
        };
      }

      const items = await this.prisma[module].findMany({
        where: querys,
        ...paginationConfig,
        include,
        orderBy: orderBy || undefined,
        select,
      });

      const totalPages =
        itemsPerPage === -1 ? 1 : Math.ceil(totalItems / itemsPerPage);

      return {
        items, // 1. Renomeado de "data" para "items"
        meta: {
          // 2. Agrupado metadados de paginação
          totalItems,
          itemsPerPage: itemsPerPage === -1 ? totalItems : itemsPerPage,
          totalPages,
          currentPage: page,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Erro ao paginar dados do módulo ${module}.`,
      );
    }
  }
}
