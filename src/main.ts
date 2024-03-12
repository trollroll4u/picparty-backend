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

  await app.listen(3000);

  // Start HTTPS server
  // const httpsOptions = {
  //   key: fs.readFileSync('./path/to/key.pem'),
  //   cert: fs.readFileSync('./path/to/cert.pem'),
  //   secureOptions: require('constants').SSL_OP_NO_TLSv1 | require('constants').SSL_OP_NO_TLSv1_1,
  // };
  // const httpsServer = await NestFactory.create(AppModule, { httpsOptions });
  // await httpsServer.listen(3001);  // Choose a different port for HTTPS, e.g., 3001
}

bootstrap();
