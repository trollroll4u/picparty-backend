// comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { Comment } from '../entities/comment.entity';
import { User } from '../entities/user.entity';
import { Event } from '../entities/event.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { user_id, event_id, ...rest} = createCommentDto;

    const user = await this.userModel.findById(user_id);
    if (!user) {
      throw new NotFoundException('User not found'); 
    }

    const event = await this.eventModel.findById(event_id);
    if (!event) {
      throw new NotFoundException('Event not found'); 
    }

    const createdComment = new this.commentModel({
      ...rest,
      user_id: user_id,
      event_id: event_id
    });

    return createdComment.save();
  }

  async readComment(commentId: string): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async readAllComments(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async updateComment(commentId: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    comment.set(updateCommentDto);
    return comment.save();
  }

  async deleteComment(commentId: string): Promise<void> {
    const comment = await this.commentModel.findByIdAndDelete(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
  }
}
