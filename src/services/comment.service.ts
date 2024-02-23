// comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { Comment } from '../entities/comment.entity';
import { User } from '../entities/user.entity';
import { Event } from '../entities/event.entity';
import { Multer } from 'multer';
import { FileService } from './file.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly fileService: FileService) {}


    async commentType(commentCreated: Comment, user: User, event: Event): Promise<void> {
      const { like, pic_file, comment } = commentCreated;
      
      // Check if exactly one of the properties has a value
      if (
        (like && pic_file == "" && comment == "") ||
        (!like && pic_file != "" && comment == "") ||
        (!like && pic_file == "" && comment != "")
      ) {
        // Only one of the properties has a value
    
        if (like) {
          // Logic for handling like
          event.likes.push(commentCreated);
          user.likes.push(commentCreated);
        }
    
        if (pic_file) {
          const filePath = `./images/${commentCreated._id}.jpg`;
          await this.fileService.saveFileFromBuffer(pic_file, filePath);
          event.pictures.push(commentCreated);
          user.pictures.push(commentCreated);
        }
    
        if (comment) {
          event.comments.push(commentCreated);
          user.comments.push(commentCreated);
        }
    
        // Common logic
        await user.save();
        await event.save();
      } else {
        // Handle the case where more than one or none of the properties have a value
        throw new Error('Invalid comment structure: Only one of like, picture, or comment should have a value.');
      }
    }

  async createComment(createCommentDto: CreateCommentDto, file?: Multer.File): Promise<Comment> {
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

    await createdComment.save();

    await this.commentType(createdComment, user, event)

    return createdComment;
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

  async readAllPictureComments(): Promise<Comment[]> {
    return this.commentModel.find({ pic_file: { $exists: true, $ne: '' } }).exec();
  }

  async readAllCommentsByUser(user_id: string): Promise<Comment[]> {
    const user = await this.userModel.findById(user_id);

    const userComments = await Promise.all(
      user.comments.map(async (com) => {
        return await this.commentModel.findById(com);
      })
    )
    return userComments
  }

  async readAllCommentsByEvent(event_id: string): Promise<Comment[]> {
    const event = await this.eventModel.findById(event_id);

    const eventComments = await Promise.all(
      event.comments.map(async (com) => {
        return await this.commentModel.findById(com);
      })
    )
    return eventComments
  }

  async updateComment(commentId: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.pic_file != "") {
      this.fileService.deleteFileById((comment._id).toString())
      const filePath = `./images/${commentId}.jpg`;
      await this.fileService.saveFileFromBuffer(comment.pic_file, filePath);
    }
    comment.set(updateCommentDto);
    return comment.save();
  }

  async deleteComment(commentId: string): Promise<void> {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const user = await this.userModel.findById(comment.user_id);
    if (!user) {
      throw new NotFoundException('User not found'); 
    }

    const event = await this.eventModel.findById(comment.event_id);
    if (!event) {
      throw new NotFoundException('Event not found'); 
    }

    await this.commentModel.findByIdAndDelete(commentId)

    const eventToRemove = event.likes.findIndex(obj => obj._id === commentId);
    event.likes.splice(eventToRemove, 1);
    event.save()

    const userToRemove = user.likes.findIndex(obj => obj._id === commentId);
    user.likes.splice(userToRemove, 1);
    user.save()
  }
}
