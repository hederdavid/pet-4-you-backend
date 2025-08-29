import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

process.env.TZ = 'America/Sao_Paulo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const HTTP_PORT = process.env.HTTP_PORT || 3000;
  const APP_HOSTNAME = process.env.APP_HOSTNAME || 'localhost';
  const ssl = process.env.SSL === 'true';

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Pet-4-You Backend')
    .setDescription(
      'API REST para conectar pessoas que desejam adotar animais de estimação com aqueles que precisam encontrar um novo lar para seus pets.',
    )
    .setVersion('1.0')
    .addTag('Módulos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:9001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(HTTP_PORT, () => {
    const address =
      'http' + (ssl ? 's' : '') + '://' + APP_HOSTNAME + ':' + HTTP_PORT + '/';
    Logger.log('Listening at ' + address);
  });
}

bootstrap();
