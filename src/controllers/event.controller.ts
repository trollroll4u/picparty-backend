// event.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventService } from '../services/event.service';
import { CreateEventDto, UpdateEventDto } from '../dtos/event.dto';
import { Event } from '../entities/event.entity';
import { Comment } from '../entities/comment.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created', type: Event })
  createEvent(@Body() createEventDto: CreateEventDto, @UploadedFile() file?: Multer.File) {
    return this.eventService.createEvent(createEventDto, file);
  }

  @Get('get/:eventId')
  @ApiOperation({ summary: 'Get a event by ID' })
  @ApiResponse({ status: 200, description: 'Event details', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
  readEvent(@Param('eventId') eventId: string) {
    return this.eventService.readEvent(eventId);
  }

  @Get('get_pictures/:eventId')
  @ApiOperation({ summary: 'Get a events pictures by ID' })
  @ApiResponse({ status: 200, description: 'Events pictures details', type: [Comment] })
  @ApiResponse({ status: 404, description: 'Event not found' })
  readPicturesByEvent(@Param('eventId') eventId: string) {
    return this.eventService.readPicturesByEvent(eventId);
  }

  @Get('get_comments/:eventId')
  @ApiOperation({ summary: 'Get a events comments by ID' })
  @ApiResponse({ status: 200, description: 'Events comments details', type: [Comment] })
  @ApiResponse({ status: 404, description: 'Event not found' })
  readCommentsByEvent(@Param('eventId') eventId: string) {
    return this.eventService.readCommentsByEvent(eventId);
  }

  @Get('get_likes/:eventId')
  @ApiOperation({ summary: 'Get a events likes by ID' })
  @ApiResponse({ status: 200, description: 'Events likes details', type: [Comment] })
  @ApiResponse({ status: 404, description: 'Event not found' })
  readLikesByEvent(@Param('eventId') eventId: string) {
    return this.eventService.readLikesByEvent(eventId);
  }

  @Get('get_by_user/:userId')
  @ApiOperation({ summary: 'Get events by user ID' })
  @ApiResponse({ status: 200, description: 'Events details', type: [Event] })
  @ApiResponse({ status: 404, description: 'Event not found' })
  readAllEventsByUser(@Param('userId') userId: string) {
    return this.eventService.readAllEventsByUser(userId);
  }

  @Get('get')
  @ApiOperation({ summary: 'List all events' })
  @ApiResponse({ status: 200, description: 'A list of events', type: [Event] })
  readAllEvents() {
    return this.eventService.readAllEvents();
  }

  @Put('update/:eventId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Update a Event' })
  @ApiResponse({ status: 200, description: 'Event updated', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
  updateEvent(@Param('eventId') eventId: string, @Body() updateEventDto: UpdateEventDto, @UploadedFile() file?: Multer.File) {
    return this.eventService.updateEvent(eventId, updateEventDto, file);
  }

  @Delete('delete/:eventId')
  @ApiOperation({ summary: 'Delete a event' })
  @ApiResponse({ status: 204, description: 'Event deleted' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  deleteEvent(@Param('eventId') eventId: string) {
    return this.eventService.deleteEvent(eventId);
  }
}
