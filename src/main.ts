import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  try {
    const app = await NestFactory.create(AppModule);

    const corsOptions: CorsOptions = {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204,
    };

    app.enableCors(corsOptions);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.error('Failed to bootstrap the application:', error);
  }
}

bootstrap();
