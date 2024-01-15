import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PictureModule } from './modules/picture.module';
import { EventModule } from './modules/event.module';
import { CommentModule } from './modules/comment.module';
// import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    UserModule,
    PictureModule,
    EventModule,
    CommentModule,
    // ConfigModule,
    MongooseModule.forRoot('mongodb://localhost/local'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}