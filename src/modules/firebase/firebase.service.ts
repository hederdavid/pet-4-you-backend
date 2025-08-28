import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private auth: admin.auth.Auth;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const serviceAccount = {
      type: this.configService.get<string>('FB_ADMIN_TYPE'),
      project_id: this.configService.get<string>('FB_ADMIN_PROJECT_ID'),
      private_key_id: this.configService.get<string>('FB_ADMIN_PRIVATE_KEY_ID'),
      private_key: this.configService
        .get<string>('FB_ADMIN_PRIVATE_KEY', '')
        .replace(/\\n/g, '\n'),
      client_email: this.configService.get<string>('FB_ADMIN_CLIENT_EMAIL'),
      client_id: this.configService.get<string>('FB_ADMIN_CLIENT_ID'),
      auth_uri: this.configService.get<string>('FB_ADMIN_AUTH_URI'),
      token_uri: this.configService.get<string>('FB_ADMIN_TOKEN_URI'),
      auth_provider_x509_cert_url: this.configService.get<string>(
        'FB_ADMIN_AUTH_PROVIDER_X509_CERT_URL',
      ),
      client_x509_cert_url: this.configService.get<string>(
        'FB_ADMIN_CLIENT_X509_CERT_URL',
      ),
    } as admin.ServiceAccount;

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
