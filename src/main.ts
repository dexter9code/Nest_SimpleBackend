import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['dcka33ad3'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // to ensure to emitt invalid incoming data from body
    }),
  );
  await app.listen(3000);
}
bootstrap();
