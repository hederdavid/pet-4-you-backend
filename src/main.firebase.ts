import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as functions from 'firebase-functions/v1';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

let server: express.Express;

const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:9001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  return app.init();
};

export const api = functions
  .region('southamerica-east1')
  .https.onRequest(async (request, response) => {
    if (!server) {
      console.log('Initializing Nest server...');
      server = express();
      server.use(cookieParser());
      await createNestServer(server);
      console.log('Nest server initialized.');
    }
    
    return server(request, response);
  });
