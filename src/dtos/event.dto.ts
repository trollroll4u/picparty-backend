import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { Picture } from 'src/entities/picture.entity';
import { CreatePictureDto, UpdatePictureDto } from './picture.dto';

export class CreateEventDto {

    @ApiProperty({
        example: 'user_id',
        description: 'The user ID creating the event',
        required: true
      })
      readonly userId: string;
    
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
        example: 'picture_id',
        description: 'The picture ID of the event',
        required: false
      })
      readonly pictureId: string;

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