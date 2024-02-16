// comment.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';
import { Picture } from './picture.entity';

@Schema()
export class Comment extends Document {

  @ApiProperty({ required: true }) // Use lazy loading for User
  @Prop({ required: true })
  user_id!: string;

  @ApiProperty({ required: true }) // Use lazy loading for User
  @Prop({ required: true })
  event_id!: string;

  @ApiProperty()
  @Prop()
  pic_file: boolean;

  @ApiProperty()
  @Prop()
  comment: string;

  @ApiProperty()
  @Prop()
  like: boolean;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);
