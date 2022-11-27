import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/infrastructure/modules/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('Swagger for TDL Project')
    .setDescription('APIs for TDL Project')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
