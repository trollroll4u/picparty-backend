// comment.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';
import { Picture } from './picture.entity';

@Schema()
export class Comment extends Document {

  @ApiProperty({ required: true, type: () => User }) // Use lazy loading for User
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user!: User;

  @ApiProperty({ required: true, type: () => Picture }) // Use lazy loading for Picture
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Picture' })
  picture!: Picture;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  message!: string;

  @ApiProperty()
  @Prop()
  likes: number | 0;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);
