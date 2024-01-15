// comment.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../services/comment.service';
import { Comment, CommentSchema } from '..//entities/comment.entity';
import { User, UserSchema } from '../entities/user.entity';
import { Picture, PictureSchema } from '../entities/picture.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Comment.name, schema: CommentSchema },
    { name: Picture.name, schema: PictureSchema }])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService], // Optional: Export the service if needed in other modules
})
export class CommentModule {}
