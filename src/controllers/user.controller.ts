// user.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  createUser(@Body() createUserDto: CreateUserDto, @UploadedFile() file?: Multer.File) {
    return this.userService.createUser(createUserDto, file);
  }

  @Get('get/:userId')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User details', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  readUser(@Param('userId') userId: string) {
    return this.userService.readUser(userId);
  }

  @Get('get')
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'A list of users', type: [User] })
  readAllUsers() {
    return this.userService.readAllUsers();
  }

  @Put('update/:userId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Update a User' })
  @ApiResponse({ status: 200, description: 'User updated', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file?: Multer.File) {
    return this.userService.updateUser(userId, updateUserDto, file);
  }

  @Delete('delete/:userId')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
