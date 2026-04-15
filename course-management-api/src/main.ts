import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Removes fields not in DTO [cite: 109]
    forbidNonWhitelisted: true, // Throws error for unknown fields [cite: 109]
    transform: true, // Auto-converts types, like string to number [cite: 110, 111, 112]
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
