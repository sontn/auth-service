import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalPipes(app);
  // app.useGlobalFilters(new ExceptionLoggingFilter());
  await app.listen(3000);
}
bootstrap();

function setupGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      whitelist: true,
    }
  ));
}