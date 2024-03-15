import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {

    @ApiProperty({
      example: '123e4567-e89b-12d3-a456-426614174000',
      description: 'The user ID creating the comment',
      required: true
    })
    readonly user_id!: string;

    @ApiProperty({
      example: '123e4567-e89b-12d3-a456-426614174001',
      description: 'The user ID creating the comment',
      required: true
    })
    readonly event_id!: string;


    @ApiProperty({
      example: "base64",
      description: 'base64',
      required: false
    })
    readonly pic_file?: string;

    @ApiProperty({ 
      example: 'Look at Ohad',
      description: 'The comment text',
      required: false})
    readonly comment?: string;
  
    @ApiProperty({ 
      example: true, 
      description: 'like or not',
      required: false })
    readonly like?: boolean;
  }

export class UpdateCommentDto {
    @ApiProperty({
      example: "base64",
      description: 'base64',
      required: false
    })
    readonly pic_file?: string;

    @ApiProperty({ 
      example: 'Look at Ohad',
      description: 'The comment text',
      required: false})
    readonly comment?: string;

    @ApiProperty({ 
      example: true, 
      description: 'like or not',
      required: false })
    readonly like?: boolean;
  }