// comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { Comment } from '../entities/comment.entity';
import { Multer } from 'multer';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

  async createComment(createCommentDto: CreateCommentDto, file?: Multer.File): Promise<Comment> {

    const createdComment = this.commentRepository.create(createCommentDto);

    return this.commentRepository.save(createdComment);
  }

  async readComment(commentId: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { commentId: commentId },
      relations: [],
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async readAllComments(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async updateComment(commentId: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    // First, explicitly find the entity by id
    const comment = await this.commentRepository.findOne({ where: { commentId: commentId } });
  
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
  
    // Manually apply the updates from DTO
    if(updateCommentDto.comment) {
      comment.comment = updateCommentDto.comment;
    }
    if(updateCommentDto.userName) {
      comment.userName = updateCommentDto.userName;
    }
    if(updateCommentDto.pic_file) {
      comment.pic_file = updateCommentDto.pic_file;
    }
  
    // Save the updated entity
    return this.commentRepository.save(comment);
  }
  

  async deleteComment(commentId: string): Promise<void> {
    const result = await this.commentRepository.delete(commentId);
    if (result.affected === 0) {
      throw new NotFoundException(`Sound with ID ${commentId} not found.`);
    }
  }
}
