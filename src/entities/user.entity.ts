// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Event } from './event.entity';
import { Picture } from './picture.entity';
import { Comment } from './comment.entity';

@Schema()
export class User extends Document {
  @ApiProperty({ required: true })
  @Prop({ required: true })
  name!: string;

  @ApiProperty({ required: true})
  @Prop({ required: true, unique: true })
  email!: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  password!: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  picture_path: string;

  @ApiProperty({ type: () => [Event] })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Event' })
  events: Event[] | [];

  @ApiProperty({ type: () => [Picture] })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Picture' })
  pictures: Picture[] | [];

  @ApiProperty({ type: () => [Comment] })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Comment' })
  comments: Comment[] | [];
}

export const UserSchema = SchemaFactory.createForClass(User);
