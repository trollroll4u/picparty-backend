// event.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto, UpdateEventDto } from '../dtos/event.dto';
import { Event } from '../entities/event.entity';
import { User } from '../entities/user.entity';
import { Picture } from '../entities/picture.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name) private readonly userModel: Model<User>) {}
  

    async createEvent(createEventDto: CreateEventDto): Promise<Event> {
      const { user_id, ...rest } = createEventDto;
  
      const user = await this.userModel.findById(user_id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const createdEvent = new this.eventModel({
        ...rest,
        user_id: user_id
      });
  
      
      // Save the event
      await createdEvent.save();

      // Add the event to the user's events array
      user.events.push(createdEvent);

      // Save the user with the updated events array
      await user.save();

      return createdEvent;
    }

  async readEvent(eventId: string): Promise<Event> {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async readAllEvents(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async updateEvent(eventId: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    event.set(updateEventDto);
    return event.save();
  }

  async deleteEvent(eventId: string): Promise<void> {
    const event = await this.eventModel.findByIdAndDelete(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
  }
}
