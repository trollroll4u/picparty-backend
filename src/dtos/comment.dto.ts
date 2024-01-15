import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './user.dto';
import { CreatePictureDto } from './picture.dto';
import { Picture } from 'src/entities/picture.entity';

export class CreateCommentDto {

    @ApiProperty({
      example: 'user_id',
      description: 'The user ID creating the picture',
      required: true
    })
    readonly userId: string;

    @ApiProperty({
      example: 'picture_id',
      description: 'The picture ID creating the comment',
      required: true
    })
    readonly pictureId: string;

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