import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
// import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  try {
    const app = await NestFactory.create(AppModule);
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
      next();
    });
    const whitelist = ['react-gigalabs-social-awaisarif18.vercel.app'];
    app.enableCors({
      origin: function (origin, callback) {
        console.log('origin bhai jaan', origin);
        if (!origin || whitelist.indexOf(origin) !== -1) {
          console.log('allowed cors for:', origin);
          callback(null, true);
        } else {
          console.log('blocked cors for:', origin);
          callback(new Error('Not allowed by CORS'));
        }
      },
      allowedHeaders:
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
      methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
      credentials: true,
    });

    // const corsOptions: CorsOptions = {
    //   origin: 'https://react-gigalabs-social-awaisarif18.vercel.app',

    //   methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    //   credentials: false,
    //   // preflightContinue: true,
    //   optionsSuccessStatus: 204,
    //   allowedHeaders: [
    //     'origin',
    //     'content - type',
    //     'accept',
    //     'authorization',
    //     'X-Requested-With',
    //     'Access-Control-Allow-Origin',
    //     'Access-Control-Allow-Headers',
    //     'Access-Control-Allow-Methods',
    //     'Access-Control-Allow-Credentials',
    //   ],
    // };

    // app.enableCors(corsOptions);

    // app.useGlobalPipes(new ValidationPipe());
    await app.listen(3001);
  } catch (error) {
    console.error('Failed to bootstrap the application:', error);
  }
}

bootstrap();
