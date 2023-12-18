import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
// import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  try {
    const app = await NestFactory.create(AppModule);

    const corsOptions: CorsOptions = {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204,
      preflightContinue: true,
    };

    app.enableCors(corsOptions);

    // app.useGlobalPipes(new ValidationPipe());
    await app.listen(3001);
  } catch (error) {
    console.error('Failed to bootstrap the application:', error);
  }
}

bootstrap();
