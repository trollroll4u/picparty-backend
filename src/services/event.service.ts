// event.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto, UpdateEventDto } from '../dtos/event.dto';
import { Event } from '../entities/event.entity';
import { User } from '../entities/user.entity';
import { Comment } from '../entities/comment.entity';
import { FileService } from './file.service';
import { Multer } from 'multer';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly fileService: FileService) {}
  

    async createEvent(createEventDto: CreateEventDto, file?: Multer.File): Promise<Event> {
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

      if (file) {
        const fileExtension = this.fileService.getFileExtension(file.originalname);
        const filePath = `./images/${createdEvent._id}.${fileExtension}`;
        if (file.path) {
          await this.fileService.saveFile(file.path, filePath);
        } else {
          await this.fileService.saveFileFromBuffer(file.buffer, filePath);
        }
      }
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

  async readPicturesByEvent(eventId: string): Promise<Comment[]> {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event.pictures;
  }

  async readCommentsByEvent(eventId: string): Promise<Comment[]> {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event.comments;
  }

  async readLikesByEvent(eventId: string): Promise<Comment[]> {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event.likes;
  }

  async readAllEventsByUser(user_id : string): Promise<Event[]> {

    const user = await this.userModel.findById(user_id);

    const userEvents = await Promise.all(
      user.events.map(async (eve) => {
        return await this.eventModel.findById(eve)
      })
    )
    return userEvents
  }

  async updateEvent(eventId: string, updateEventDto: UpdateEventDto, file?: Multer.File): Promise<Event> {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    if (file) {
      this.fileService.deleteFileById((event._id).toString())
      const fileExtension = this.fileService.getFileExtension(file.originalname);
      const filePath = `./images/${eventId}.${fileExtension}`;
      if (file.path) {
        await this.fileService.saveFile(file.path, filePath);
      } else {
        await this.fileService.saveFileFromBuffer(file.buffer, filePath);
      }
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
