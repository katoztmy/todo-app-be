import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORSを有効化してApollo Studioからアクセス可能に
  await app.listen(3000);
}
bootstrap();
