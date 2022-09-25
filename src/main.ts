import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Request, Response } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { FirstInterceptor } from './interceptors/first.interceptor';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

//dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());

  app.enableCors();
  app.use(
    (req: Request, res: Response, next) => {
      console.log('middleware from app.use (main.ts)');
      next();
    });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalInterceptors(new FirstInterceptor());
  //await app.listen(process.env.APP_PORT);
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
