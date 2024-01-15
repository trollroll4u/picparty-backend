// comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { Comment } from '../entities/comment.entity';
import { Picture } from '../entities/picture.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @InjectModel(Picture.name) private readonly pictureModel: Model<Picture>,
    @InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { userId, pictureId, ...rest} = createCommentDto;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found'); 
    }

    const picture = await this.pictureModel.findById(pictureId);
    if (!picture) {
      throw new NotFoundException('Picture not found');
    }

    const createdComment = new this.commentModel({
      ...rest,
      user: user,
      picture: picture
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
