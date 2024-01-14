import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './user.dto';
import { CreatePictureDto } from './picture.dto';
import { Picture } from 'src/entities/picture.entity';

export class CreateCommentDto {

    @ApiProperty({ 
        example: 'Look at Ohad',
        description: 'The comment text',
        required: true })
    readonly message: string;
  
    @ApiProperty({ example: 1, description: 'The number of likes of a comment' })
    readonly likes: number;
  }

export class UpdateCommentDto {
    @ApiProperty({ 
        example: 'Look at Ohad',
        description: 'The comment text', })
    readonly message?: string;
  
    @ApiProperty({ example: 1, description: 'The number of likes of a comment' })
    readonly likes?: number;
  }