// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Event } from './event.entity';

@Schema()
export class Picture extends Document {

  @ApiProperty({ type: () => User })
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @ApiProperty({ type: () => Event })
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Event' })
  event: Event;

  @ApiProperty({ type: () => [Comment] }) // Use lazy loading for Comment array
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Comment' })
  comments: Comment[];

  @ApiProperty({ required: true })
  @Prop({ required: true })
  path!: string;

  @ApiProperty()
  @Prop()
  description: string;

}

export const PictureSchema = SchemaFactory.createForClass(Picture);
