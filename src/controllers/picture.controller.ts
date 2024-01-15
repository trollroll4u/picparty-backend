// picture.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PictureService } from '../services/picture.service';
import { CreatePictureDto, UpdatePictureDto } from '../dtos/picture.dto';
import { Picture } from '../entities/picture.entity';

@ApiTags('pictures')
@Controller('pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new picture' })
  @ApiResponse({ status: 201, description: 'Picture created', type: Picture })
  createPicture(@Body() createPictureDto: CreatePictureDto) {
    return this.pictureService.createPicture(createPictureDto);
  }

  @Get('get/:pictureId')
  @ApiOperation({ summary: 'Get a picture by ID' })
  @ApiResponse({ status: 200, description: 'Picture details', type: Picture })
  @ApiResponse({ status: 404, description: 'Picture not found' })
  readPicture(@Param('pictureId') pictureId: string) {
    return this.pictureService.readPicture(pictureId);
  }

  @Get('get')
  @ApiOperation({ summary: 'List all pictures' })
  @ApiResponse({ status: 200, description: 'A list of pictures', type: [Picture] })
  readAllPictures() {
    return this.pictureService.readAllPictures();
  }

  @Patch('update/:pictureId')
  @ApiOperation({ summary: 'Update a Picture' })
  @ApiResponse({ status: 200, description: 'Picture updated', type: Picture })
  @ApiResponse({ status: 404, description: 'Picture not found' })
  updatePicture(@Param('pictureId') pictureId: string, @Body() updatePictureDto: UpdatePictureDto) {
    return this.pictureService.updatePicture(pictureId, updatePictureDto);
  }

  @Delete('delete/:pictureId')
  @ApiOperation({ summary: 'Delete a picture' })
  @ApiResponse({ status: 204, description: 'Picture deleted' })
  @ApiResponse({ status: 404, description: 'Picture not found' })
  deletePicture(@Param('pictureId') pictureId: string) {
    return this.pictureService.deletePicture(pictureId);
  }
}
