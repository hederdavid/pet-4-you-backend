import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

process.env.TZ = 'America/Sao_Paulo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const HTTP_PORT = process.env.HTTP_PORT || 3000;
  const APP_HOSTNAME = process.env.APP_HOSTNAME || 'localhost';
  const ssl = process.env.SSL === 'true';
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:9001',
    credentials: true,
  });
  await app.listen(HTTP_PORT, () => {
    const address =
      'http' + (ssl ? 's' : '') + '://' + APP_HOSTNAME + ':' + HTTP_PORT + '/';
    Logger.log('Listening at ' + address);
  });
}

bootstrap();
