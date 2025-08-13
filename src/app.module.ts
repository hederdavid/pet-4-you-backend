import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './plugins/database/database.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { FirebaseService } from './modules/firebase/firebase.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PetsModule,
    AuthModule,
    DatabaseModule,
    AuthModule,
    FirebaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
