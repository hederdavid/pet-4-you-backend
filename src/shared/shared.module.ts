import { DatabaseModule } from 'src/plugins/database/database.module';
import { PaginateService } from './services/paginate.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [PaginateService],
  exports: [PaginateService],
  imports: [DatabaseModule],
})
export class SharedModule {}
