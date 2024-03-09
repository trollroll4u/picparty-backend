import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppModule } from '../app.module'; // Adjust the path as needed
import { CreateUserDto } from 'src/dtos/user.dto';

describe('UserController', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    // Use the MongoDB Memory Server URI for testing
    await mongoose.connect(mongod.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  describe('createUser', () => {
    it('should create a user and return the response status code 201', async () => {
        const createUserDto: CreateUserDto = {
          name: 'abcd',
          email: 'aas@gmail.com',
          password: 'Aa123456',
          profile_pic_file: '',
          events: [],
          pictures: [],
          comments: [],
          likes: [],
        };
      
        const result = await request(app.getHttpServer())
          .post('/users/create')
          .send(createUserDto)
          .expect(201);

        const result2 = await request(app.getHttpServer())
          .get('/users/get')
          .expect(200);

        const result3 = await request(app.getHttpServer())
          .get('/users/get/' + result.body._id)
          .expect(200);

        const result4 = await request(app.getHttpServer())
          .delete('/users/delete/' + result.body._id)
          .expect(200);
      });      
  });
});
