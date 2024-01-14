import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './user.dto';
import { Event } from '../entities/event.entity';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { Picture } from 'src/entities/picture.entity';
import { CreatePictureDto, UpdatePictureDto } from './picture.dto';

export class CreateEventDto {
    
    @ApiProperty({ 
        example: 'Tel Aviv, alenby 5',
        description: 'The location of the event',
        required: true })
    readonly location: string;

    @ApiProperty({ 
        example: 'Independence Day party at the best location in town',
        description: 'The description of the event',
        required: true })
    readonly description: string;

    @ApiProperty({ 
        example: 'Independence Day party',
        description: 'The title of the event',
        required: true })
    readonly title: string;

    @ApiProperty({ 
        type: CreatePictureDto,
        description: 'The event picture',
        required: true
    })
    readonly event_pic: Picture;

    @ApiProperty({ 
        example: '01.01.01',
        description: 'The date of the event',
        required: true
    })
    readonly date: Date;
  
  }

export class UpdateEventDto {

    @ApiProperty({
        type: UpdatePictureDto,
        isArray: true,
        description: 'The array of Comment objects',
        required: false })
    readonly pictures?: Picture[];
    
    @ApiProperty({ 
        example: 'Tel Aviv, alenby 5',
        description: 'The location of the event',
        required: true })
    readonly location?: string;

    @ApiProperty({ 
        example: 'Independence Day party at the best location in town',
        description: 'The description of the event',
        required: true })
    readonly description?: string;

    @ApiProperty({ 
        example: 'Independence Day party',
        description: 'The title of the event',
        required: true })
    readonly title?: string;

    @ApiProperty({ 
        type: UpdatePictureDto,
        description: 'The event picture',
        required: true
    })
    readonly event_pic?: Picture;

    @ApiProperty({ 
        example: '01.01.01',
        description: 'The date of the event',
        required: true
    })
    readonly date?: Date;
  }