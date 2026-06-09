import { NestFactory } from '@nestjs/core';

import { Transport } from '@nestjs/microservices';

import { AuthMsModule } from './auth-microservice/auth-ms.module';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice(
      AuthMsModule,
      {
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 5001,
        },
      },
    );

  await app.listen();

  console.log(
    '🚀 Auth Microservice running on port 5001',
  );
}

bootstrap();