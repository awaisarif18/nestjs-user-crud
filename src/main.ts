import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  try {
    const app = await NestFactory.create(AppModule);

    // Enable CORS with proper configuration
    app.enableCors({
      origin: 'https://react-gigalabs-social.vercel.app',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With',
    });

    await app.listen(3001);
    // Added success logging
    console.log('Application is running on port 3001');
  } catch (error) {
    console.error('Failed to bootstrap the application:', error);
  }
}

bootstrap();

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
