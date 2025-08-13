// hederdavid/pet-4-you-backend/src/firebase/firebase.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private auth: admin.auth.Auth;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // Monta o objeto da conta de serviço a partir das variáveis de ambiente
    const serviceAccount = {
      type: this.configService.get<string>('FIREBASE_TYPE'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      privateKeyId: this.configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
      privateKey: this.configService.get<string>('FIREBASE_PRIVATE_KEY', '').replace(/\\n/g, '\n'),
      clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      clientId: this.configService.get<string>('FIREBASE_CLIENT_ID'),
      authUri: this.configService.get<string>('FIREBASE_AUTH_URI'),
      tokenUri: this.configService.get<string>('FIREBASE_TOKEN_URI'),
      authProviderX509CertUrl: this.configService.get<string>('FIREBASE_AUTH_PROVIDER_X509_CERT_URL'),
      clientC509CertUrl: this.configService.get<string>('FIREBASE_CLIENT_X509_CERT_URL'),
    } as admin.ServiceAccount;

    // Inicializa o app do Firebase se ainda não foi inicializado
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    
    this.auth = admin.auth();
  }

  getAuth(): admin.auth.Auth {
    return this.auth;
  }
}