import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/infrastructure/modules/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('Swagger for TDL Project')
    .setDescription('APIs for TDL Project')
    .setVersion('1.0.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
