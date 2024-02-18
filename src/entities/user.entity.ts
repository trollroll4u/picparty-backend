// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Event } from './event.entity';
import { Comment } from './comment.entity';

@Schema()
export class User extends Document {
  @ApiProperty({ required: true })
  @Prop({ required: true })
  name!: string;

  @ApiProperty({ required: true })
  @Prop({ required: true, unique: true })
  email!: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  password!: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  profile_pic_file: string;

  @ApiProperty({ type: () => [Event] })
  @Prop()
  events: Event[];

  @ApiProperty({ type: () => [Comment] })
  @Prop()
  pictures: Comment[];

  @ApiProperty({ type: () => [Comment] })
  @Prop()
  comments: Comment[];

  @ApiProperty({ type: () => [Comment] })
  @Prop()
  likes: Comment[];
}

export const UserSchema = SchemaFactory.createForClass(User);
