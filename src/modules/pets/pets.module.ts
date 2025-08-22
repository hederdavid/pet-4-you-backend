import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PaginateService } from 'src/shared/services/paginate.service';

@Module({
  imports: [],
  controllers: [PetsController],
  providers: [PetsService, PaginateService],
})
export class PetsModule {}
