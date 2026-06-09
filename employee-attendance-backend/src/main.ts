import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';

import * as express from 'express';

import { join } from 'path';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  app.enableCors();

  // Serve uploaded files
  app.use(
    '/uploads',
    express.static(
      join(
        process.cwd(),
        'uploads',
      ),
    ),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config =
    new DocumentBuilder()
      .setTitle(
        'Employee Attendance Portal API',
      )
      .setDescription(
        'Employee Attendance Management System',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'api-docs',
    app,
    document,
  );

  await app.listen(5000);

  console.log(
    'Server Running: http://localhost:5000',
  );

  console.log(
    'Swagger Docs: http://localhost:5000/api-docs',
  );
}

bootstrap();