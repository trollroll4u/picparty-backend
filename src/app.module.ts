import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    UserModule,
    // ConfigModule,
    MongooseModule.forRoot('mongodb://localhost/local'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}