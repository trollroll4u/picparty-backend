// comment.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { Comment } from '../entities/comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, description: 'Comment created', type: Comment })
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get('get/:commentId')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, description: 'Comment details', type: Comment })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  readComment(@Param('commentId') commentId: string) {
    return this.commentService.readComment(commentId);
  }

  @Get('get_by_user/:userId')
  @ApiOperation({ summary: 'Get comments by user ID' })
  @ApiResponse({ status: 200, description: 'Comments details', type: [Comment] })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  readAllCommentsByUser(@Param('userId') userId: string) {
    return this.commentService.readAllCommentsByUser(userId);
  }

  @Get('get_by_event/:eventId')
  @ApiOperation({ summary: 'Get comments by event ID' })
  @ApiResponse({ status: 200, description: 'Comments details', type: [Comment] })
  @ApiResponse({ status: 404, description: 'comment not found' })
  readAllCommentsByEvent(@Param('eventId') eventId: string) {
    return this.commentService.readAllCommentsByEvent(eventId);
  }

  @Get('get')
  @ApiOperation({ summary: 'List all comments' })
  @ApiResponse({ status: 200, description: 'A list of comments', type: [Comment] })
  readAllComments() {
    return this.commentService.readAllComments();
  }

  @Get('get_pictures')
  @ApiOperation({ summary: 'List all picture comments' })
  @ApiResponse({ status: 200, description: 'A list of picture comments', type: [Comment] })
  readAllPictureComments() {
    return this.commentService.readAllPictureComments();
  }

  @Put('update/:commentId')
  @ApiOperation({ summary: 'Update a Comment' })
  @ApiResponse({ status: 200, description: 'Comment updated', type: Comment })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  updateComment(@Param('commentId') commentId: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateComment(commentId, updateCommentDto);
  }

  @Delete('delete/:commentId')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 204, description: 'Comment deleted' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(commentId);
  }
}
