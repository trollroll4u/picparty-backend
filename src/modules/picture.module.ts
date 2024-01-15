// picture.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PictureController } from '../controllers/picture.controller';
import { PictureService } from '../services/picture.service';
import { Picture, PictureSchema } from '..//entities/picture.entity';
import { User, UserSchema } from '../entities/user.entity';
import { Event, EventSchema } from '../entities/event.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Event.name, schema: EventSchema },
    { name: Picture.name, schema: PictureSchema }])],
  controllers: [PictureController],
  providers: [PictureService],
  exports: [PictureService], // Optional: Export the service if needed in other modules
})
export class PictureModule {}
