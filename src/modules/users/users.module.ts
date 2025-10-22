import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PaginateService } from 'src/shared/services/paginate.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PaginateService],
})
export class UsersModule {}
