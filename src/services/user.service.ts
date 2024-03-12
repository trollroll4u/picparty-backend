// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { FileService } from './file.service';
import * as fsPromises from 'fs/promises';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
  private readonly fileService: FileService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    if (createdUser.profile_pic_file) {
      const filePath = `./images/${createdUser._id}.jpg`;
      await this.fileService.saveFileFromBuffer(createdUser.profile_pic_file, filePath);
    }
    return createdUser;
  }

  async readUser(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async readAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const filePath = `./images/${userId}.jpg`;
    if ("profile_pic_file" in updateUserDto) {
      await this.fileService.deleteFileById((user._id).toString())
      await this.fileService.saveFileFromBuffer(user.profile_pic_file, filePath);
    }
    user.set(updateUserDto);
    return user.save();
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.profile_pic_file) {
      await this.fileService.deleteFileById((user._id).toString())
    }
  }
}
