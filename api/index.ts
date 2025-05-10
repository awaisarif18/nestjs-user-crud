import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import * as dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = [
  'https://react-gigalabs-social.vercel.app',
  'https://react-gigalabs-social-awaisarif18.vercel.app',
  'https://react-gigalabs-social-git-main-awaisarif18.vercel.app',
];

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS error: Origin ${origin} not allowed`));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      allowedHeaders: [
        'Content-Type',
        'Accept',
        'Authorization',
        'Origin',
        'X-Requested-With',
      ],
      optionsSuccessStatus: 204,
    });

    await app.listen(3001);
    console.log('Application is running on port 3001');
  } catch (error) {
    console.error('Failed to bootstrap the application:', error);
  }
}

bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from '../src/app/app.module';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import * as express from 'express';
// import { Callback, Context, Handler } from 'aws-lambda';
// import * as dotenv from 'dotenv';

// dotenv.config();

// const server = express();
// const adapter = new ExpressAdapter(server);

// let cachedApp;

// async function bootstrap() {
//   if (!cachedApp) {
//     const app = await NestFactory.create(AppModule, adapter);
//     app.enableCors({
//       origin: 'https://react-gigalabs-social.vercel.app',
//       credentials: true,
//     });
//     await app.init();
//     cachedApp = server;
//   }
//   return cachedApp;
// }

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   const app = await bootstrap();
//   return app(event, context, callback);
// };

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from '../src/app/app.module';
// import * as dotenv from 'dotenv';

// async function bootstrap() {
//   dotenv.config();

//   try {
//     const app = await NestFactory.create(AppModule);

//     // Enable CORS with proper configuration
//     app.enableCors({
//       origin: 'https://react-gigalabs-social.vercel.app',
//       methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//       allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With',
//     });

//     await app.listen(3001);
//     // Added success logging
//     console.log('Application is running on port 3001');
//   } catch (error) {
//     console.error('Failed to bootstrap the application:', error);
//   }
// }

// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app/app.module';
// // import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
// // import { ValidationPipe } from '@nestjs/common';
// import * as dotenv from 'dotenv';

// async function bootstrap() {
//   dotenv.config();

//   try {
//     const app = await NestFactory.create(AppModule);
//     app.use((req, res, next) => {
//       res.header('*');
//       res.header(
//         'Access-Control-Allow-Methods',
//         'GET,PUT,POST,DELETE, PATCH, HEAD, OPTIONS',
//       );
//       res.header(
//         'Access-Control-Allow-Headers',
//         'Content-Type, Accept, Origin, X-Requested-With, Authorization',
//         '*',
//       );
//       next();
//     });

//     app.enableCors({
//       allowedHeaders: '*',
//       origin: 'https://react-gigalabs-social.vercel.app',
//       methods: '*',
//     });

//     // const corsOptions: CorsOptions = {
//     //   origin: 'https://react-gigalabs-social-awaisarif18.vercel.app',

//     //   methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
//     //   credentials: false,
//     // preflightContinue: true,
//     //   optionsSuccessStatus: 204,
//     //   allowedHeaders: [
//     //     'origin',
//     //     'content - type',
//     //     'accept',
//     //     'authorization',
//     //     'X-Requested-With',
//     //     'Access-Control-Allow-Origin',
//     //     'Access-Control-Allow-Headers',
//     //     'Access-Control-Allow-Methods',
//     //     'Access-Control-Allow-Credentials',
//     //   ],
//     // };

//     // app.enableCors(corsOptions);

//     // app.useGlobalPipes(new ValidationPipe());
//     await app.listen(3001);
//   } catch (error) {
//     console.error('Failed to bootstrap the application:', error);
//   }
// }

// bootstrap();
