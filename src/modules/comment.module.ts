// comment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../services/comment.service';
import { Comment } from '..//entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService], // Optional: Export the service if needed in other modules
})
export class CommentModule {}
