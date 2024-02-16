import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

export class CreateEventDto {

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'The user ID creating the event',
        required: true
      })
      readonly user_id!: string;
    
    @ApiProperty({ 
        example: 'Tel Aviv, alenby 5',
        description: 'The location of the event',
        required: false })
    readonly location?: string;

    @ApiProperty({ 
        example: 'Independence Day party at the best location in town',
        description: 'The description of the event',
        required: false })
    readonly description?: string;

    @ApiProperty({ 
        example: 'Independence Day party',
        description: 'The title of the event',
        required: false })
    readonly title?: string;

    @ApiProperty({
        example: true,
        description: 'Does the event has a picture',
        required: false
      })
      readonly event_pic_file?: boolean;

    @ApiProperty({ 
        example: '01.01.01',
        description: 'The date of the event',
        required: false
    })
    readonly date?: Date;

    @ApiProperty({ 
        type: CreateCommentDto,
        isArray: true,
        description: 'The event picture',
        required: false
    })
    readonly comments?: Comment[];

    @ApiProperty({ 
        type: CreateCommentDto,
        isArray: true,
        description: 'The event picture',
        required: false
    })
    readonly likes?: Comment[];
    
    @ApiProperty({ 
        type: CreateCommentDto,
        isArray: true,
        description: 'The event picture',
        required: false
    })
    readonly pictures?: Comment[];
  }

export class UpdateEventDto {

    @ApiProperty({
        type: UpdateCommentDto,
        isArray: true,
        description: 'The array of Pictures',
        required: false })
        readonly pictures?: Comment[];
    
    @ApiProperty({
        type: UpdateCommentDto,
        isArray: true,
        description: 'The array of Likes',
        required: false })
        readonly likes?: Comment[];

    @ApiProperty({
        type: UpdateCommentDto,
        isArray: true,
        description: 'The array of Comment',
        required: false })
        readonly comments?: Comment[];
    
    @ApiProperty({ 
        example: 'Tel Aviv, alenby 5',
        description: 'The location of the event',
        required: false })
    readonly location?: string;

    @ApiProperty({ 
        example: 'Independence Day party at the best location in town',
        description: 'The description of the event',
        required: false })
    readonly description?: string;

    @ApiProperty({ 
        example: 'Independence Day party',
        description: 'The title of the event',
        required: false })
    readonly title?: string;

    @ApiProperty({ 
        example: true,
        description: 'Does the event has a picture?',
        required: false
    })
    readonly event_pic_file?: boolean;

    @ApiProperty({ 
        example: '01.01.01',
        description: 'The date of the event',
        required: false
    })
    readonly date?: Date;
  }