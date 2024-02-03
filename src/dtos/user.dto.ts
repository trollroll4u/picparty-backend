import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
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
    readonly profile_pic_path: string;
  
    @ApiProperty({
        type: CreateCommentDto,
        isArray: true,
        description: 'The array of Comments',
        required: false })
    readonly comments?: Comment[];
  
    @ApiProperty({
        type: CreateCommentDto,
        isArray: true,
        description: 'The array of Pictures',
        required: false })
    readonly pictures?: Comment[];

    @ApiProperty({
        type: CreateCommentDto,
        isArray: true,
        description: 'The array of Likes',
        required: false })
    readonly likes?: Comment[];
  
    @ApiProperty({
        type: CreateEventDto,
        isArray: true,
        description: 'The array of Events',
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
        example: 'C:/pictures/yuval.jpg',
        description: 'The path of the saved profile picture',
    })
    readonly profile_pic_path?: string;
    
    @ApiProperty({
        type: UpdateCommentDto,
        isArray: true,
        description: 'The array of Comments',
        required: false })
    readonly comments?: Comment[];
  
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
        type: UpdateEventDto,
        isArray: true,
        description: 'The array of Event objects',
        required: false })
    readonly events?: Event[];
  }