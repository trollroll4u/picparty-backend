import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './user.dto';
import { Event } from '../entities/event.entity';
import { CreateEventDto } from './event.dto';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

export class CreatePictureDto {

    @ApiProperty({ 
        example: 'C:/pictures/yuval.jpg',
        description: 'The path of the saved picture',
    })
    readonly path: string;

    @ApiProperty({ 
        example: 'There are Yuval and Ohad',
        description: 'The description of the picture',
        required: false })
    readonly description?: string;
  
  }

export class UpdatePictureDto {
    @ApiProperty({
        type: UpdateCommentDto,
        isArray: true,
        description: 'The array of Comment objects',
        required: false })
    readonly comments?: Comment[];

    @ApiProperty({ 
        example: 'There are Yuval and Ohad',
        description: 'The description of the picture',
        required: false })
    readonly description?: string;
  }