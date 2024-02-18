// event.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Schema()
export class Event extends Document {

  @ApiProperty({ required: true })
  @Prop({ required: true })
  user_id!: string;

  @ApiProperty({ type: () => [Comment] })
  @Prop()
  pictures: Comment[];

  @ApiProperty({ type: () => [Comment] })
  @Prop()
  comments: Comment[];

  @ApiProperty({ type: () => [Comment] })
  @Prop()
  likes: Comment[];

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
  event_pic_file: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  date: Date;

}

export const EventSchema = SchemaFactory.createForClass(Event);
