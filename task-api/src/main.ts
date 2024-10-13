import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

config(); // Load .env variables

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:8100', // Default to localhost:8100 if not in env
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Task Api')
    .setDescription('RESTful API for task management app')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000; // Default to 3000 if not in env
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}

bootstrap();
