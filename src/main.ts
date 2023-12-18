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
      origin: 'https://react-gigalabs-social-awaisarif18.vercel.app/',

      methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
      credentials: false,
      // preflightContinue: true,
      optionsSuccessStatus: 204,
      allowedHeaders: '[origin, content - type, accept, authorization]',
    };

    app.enableCors(corsOptions);

    // app.useGlobalPipes(new ValidationPipe());
    await app.listen(3001);
  } catch (error) {
    console.error('Failed to bootstrap the application:', error);
  }
}

bootstrap();
