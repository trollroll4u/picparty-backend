import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { Picture } from 'src/entities/picture.entity';
import { CreatePictureDto, UpdatePictureDto } from './picture.dto';
import { CreateEventDto, UpdateEventDto } from './event.dto';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the User' })
    readonly name: string;
  
    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the User' })
    readonly email: string;
  
    @ApiProperty({ example: 'password123', description: 'The password of the User' })
    readonly password: string;

    @ApiProperty({ 
        example: 'C:/pictures/yuval.jpg',
        description: 'The path of the saved profile picture',
    })
    readonly picture_path: string;
  
    @ApiProperty({
        type: CreateCommentDto,
        isArray: true,
        description: 'The array of Comment objects',
        required: false })
    readonly comments?: Comment[];
  
    @ApiProperty({
        type: CreatePictureDto,
        isArray: true,
        description: 'The array of Picture objects',
        required: false })
    readonly pictures?: Picture[];
  
    @ApiProperty({
        type: CreateEventDto,
        isArray: true,
        description: 'The array of Event objects',
        required: false })
    readonly events?: Event[];
  }

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the User' })
    readonly name?: string;
  
    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the User' })
    readonly email?: string;
  
    @ApiProperty({ example: 'newpassword123', description: 'The new password of the User' })
    readonly password?: string;
    
    @ApiProperty({
        type: UpdateCommentDto,
        isArray: true,
        description: 'The array of Comment objects',
        required: false })
    readonly comments?: Comment[];
  
    @ApiProperty({
        type: UpdatePictureDto,
        isArray: true,
        description: 'The array of Picture objects',
        required: false })
    readonly pictures?: Picture[];
  
    @ApiProperty({
        type: UpdateEventDto,
        isArray: true,
        description: 'The array of Event objects',
        required: false })
    readonly events?: Event[];
  }