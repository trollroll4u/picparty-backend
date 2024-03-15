import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './modules/event.module';
import { CommentModule } from './modules/comment.module';
// import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    UserModule,
    // PictureModule,
    EventModule,
    CommentModule,
    // ConfigModule,
    MongooseModule.forRoot(getMongoUrl()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

function getMongoUrl(): string {
  // Your condition to determine the URL dynamically
  const isProduction = process.env.NODE_ENV === 'production';

  // Return the appropriate URL based on the condition
  return process.env.NODE_ENV === 'production' ? 'mongodb://admin:bartar20%40CS@127.0.0.1:21771/test' : 'mongodb://localhost/local';
}