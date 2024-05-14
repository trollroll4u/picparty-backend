import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {

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
      example: 'Ohad',
      description: 'The comment user name',
      required: false})
    readonly userName?: string;
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
      example: 'Ohad',
      description: 'The comment user name',
      required: false})
    readonly userName?: string;
  }