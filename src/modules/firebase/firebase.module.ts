// src/firebase/firebase.module.ts
import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Global() // Torna o módulo global
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService], // Exporta o serviço para ser usado em outros módulos
})
export class FirebaseModule {}