// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { FileService } from './file.service';
import { Multer } from 'multer';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
  private readonly fileService: FileService) {}

  async createUser(createUserDto: CreateUserDto, file?: Multer.File): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    if (file) {
      const fileExtension = this.fileService.getFileExtension(file.originalname);
      const filePath = `./images/${createdUser._id}.${fileExtension}`;
      if (file.path) {
        await this.fileService.saveFile(file.path, filePath);
      } else {
        await this.fileService.saveFileFromBuffer(file.buffer, filePath);
      }
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

  async updateUser(userId: string, updateUserDto: UpdateUserDto, file?: Multer.File): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (file) {
      this.fileService.deleteFileById((user._id).toString())
      const fileExtension = this.fileService.getFileExtension(file.originalname);
      const filePath = `./images/${userId}.${fileExtension}`;
      if (file.path) {
        await this.fileService.saveFile(file.path, filePath);
      } else {
        await this.fileService.saveFileFromBuffer(file.buffer, filePath);
      }
    }
    user.set(updateUserDto);
    return user.save();
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
