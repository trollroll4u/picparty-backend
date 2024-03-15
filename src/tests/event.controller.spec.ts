import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppModule } from '../app.module'; // Adjust the path as needed
import { CreateEventDto } from 'src/dtos/event.dto';
import { CreateUserDto } from 'src/dtos/user.dto';

describe('EventController', () => {
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

  describe('createEvent', () => {
    it('should create a event and return the response status code 201', async () => {
        const createUserDto: CreateUserDto = {
            name: 'event',
            email: 'event@gmail.com',
            password: 'Aa123456',
            profile_pic_file: '',
            events: [],
            pictures: [],
            comments: [],
            likes: [],
        };

        const user = await request(app.getHttpServer())
          .post('/users/create')
          .send(createUserDto)
          .expect(201);

        const createEventDto: CreateEventDto = {
            user_id: user.body._id,
            pictures: [],
            comments: [],
            likes: [],
            location: "Tel Aviv",
            description: "partyyyy",
            title: "test",
            event_pic_file: "",
            date: new Date(Date.now())
          };
      
        const result = await request(app.getHttpServer())
          .post('/events/create')
          .send(createEventDto)
          .expect(201);

        const result2 = await request(app.getHttpServer())
          .get('/events/get')
          .expect(200);

        const result3 = await request(app.getHttpServer())
          .get('/events/get/' + result.body._id)
          .expect(200);

        const result4 = await request(app.getHttpServer())
          .delete('/events/delete/' + result.body._id)
          .expect(200);

        const delUser = await request(app.getHttpServer())
          .delete('/users/delete/' + user.body._id)
          .expect(200);
      });      
  });
});
