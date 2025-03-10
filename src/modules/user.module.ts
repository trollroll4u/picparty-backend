// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { User, UserSchema } from '..//entities/user.entity';
import { FileService } from '../services/file.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, FileService],
  exports: [UserService], // Optional: Export the service if needed in other modules
})
export class UserModule {}
