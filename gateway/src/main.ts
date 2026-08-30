import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const PORT = 3069;
  await app.listen(PORT, () => {
    console.log(`Gateway is running on port ${PORT}`);
  });
}
bootstrap();
