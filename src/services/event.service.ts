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
    @InjectModel(Picture.name) private readonly pictureModel: Model<Picture>,
    @InjectModel(User.name) private readonly userModel: Model<User>) {}
  

    async createEvent(createEventDto: CreateEventDto): Promise<Event> {
      const { userId, pictureId, ...rest } = createEventDto;
  
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const picture = await this.pictureModel.findById(pictureId);
      if (!user) {
        throw new NotFoundException('Picture not found');
      }
  
      const createdEvent = new this.eventModel({
        ...rest,
        user: user,
        picture: picture
      });
  
      return createdEvent.save();
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
