// event.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventService } from '../services/event.service';
import { CreateEventDto, UpdateEventDto } from '../dtos/event.dto';
import { Event } from '../entities/event.entity';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created', type: Event })
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Get('get/:eventId')
  @ApiOperation({ summary: 'Get a event by ID' })
  @ApiResponse({ status: 200, description: 'Event details', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
  readEvent(@Param('eventId') eventId: string) {
    return this.eventService.readEvent(eventId);
  }

  @Get('get')
  @ApiOperation({ summary: 'List all events' })
  @ApiResponse({ status: 200, description: 'A list of events', type: [Event] })
  readAllEvents() {
    return this.eventService.readAllEvents();
  }

  @Put('update/:eventId')
  @ApiOperation({ summary: 'Update a Event' })
  @ApiResponse({ status: 200, description: 'Event updated', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
  updateEvent(@Param('eventId') eventId: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(eventId, updateEventDto);
  }

  @Delete('delete/:eventId')
  @ApiOperation({ summary: 'Delete a event' })
  @ApiResponse({ status: 204, description: 'Event deleted' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  deleteEvent(@Param('eventId') eventId: string) {
    return this.eventService.deleteEvent(eventId);
  }
}
