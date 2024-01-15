// picture.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePictureDto, UpdatePictureDto } from '../dtos/picture.dto';
import { Picture } from '../entities/picture.entity';
import { User } from '../entities/user.entity';
import { Event } from '../entities/event.entity';

@Injectable()
export class PictureService {
  constructor(
    @InjectModel(Picture.name) private readonly pictureModel: Model<Picture>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createPicture(createPictureDto: CreatePictureDto): Promise<Picture> {
    const { userId, eventId, ...rest} = createPictureDto;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found'); 
    }

    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const createdPicture = new this.pictureModel({
      ...rest,
      user: user,
      event: event
    });

    return createdPicture.save();
  }

  async readPicture(pictureId: string): Promise<Picture> {
    const picture = await this.pictureModel.findById(pictureId);
    if (!picture) {
      throw new NotFoundException('Picture not found');
    }
    return picture;
  }

  async readAllPictures(): Promise<Picture[]> {
    return this.pictureModel.find().exec();
  }

  async updatePicture(pictureId: string, updatePictureDto: UpdatePictureDto): Promise<Picture> {
    const picture = await this.pictureModel.findById(pictureId);
    if (!picture) {
      throw new NotFoundException('Picture not found');
    }
    picture.set(updatePictureDto);
    return picture.save();
  }

  async deletePicture(pictureId: string): Promise<void> {
    const picture = await this.pictureModel.findByIdAndDelete(pictureId);
    if (!picture) {
      throw new NotFoundException('Picture not found');
    }
  }
}
