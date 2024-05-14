import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API Description')
    .setVersion('1.0')
    .addTag('example') // Optional: Add tags for grouping
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(3010);
  } else {
    // Start HTTPS server
    const httpsOptions = {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
    };
    const httpsServer = await NestFactory.create(AppModule, { httpsOptions });
    httpsServer.use(cors())
    httpsServer.use(express.json({ limit: '10mb' })); 
    const document = SwaggerModule.createDocument(httpsServer, config);
    SwaggerModule.setup('api', httpsServer, document);
    await httpsServer.listen(80);  // Choose a different port for HTTPS, e.g., 3001
  }
}

bootstrap();
