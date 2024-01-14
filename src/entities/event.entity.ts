// event.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';
import { Picture } from './picture.entity';

@Schema()
export class Event extends Document {

  @ApiProperty({ required: true, type: () => User }) // Use lazy loading for User
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user!: User;

  @ApiProperty({ type: () => [Picture] }) // Use lazy loading for Picture array
  @Prop()
  pictures: Picture[];

  @ApiProperty({ required: true })
  @Prop({ required: true })
  location: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  event_pic: Picture;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  date: Date;

}

export const EventSchema = SchemaFactory.createForClass(Event);
