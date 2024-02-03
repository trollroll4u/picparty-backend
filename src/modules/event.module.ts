// event.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from '../controllers/event.controller';
import { EventService } from '../services/event.service';
import { Event, EventSchema } from '..//entities/event.entity';
import { User, UserSchema } from '../entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Event.name, schema: EventSchema }])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService], // Optional: Export the service if needed in other modules
})
export class EventModule {}
