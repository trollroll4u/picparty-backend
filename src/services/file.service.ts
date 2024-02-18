// file.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class FileService {
  async saveFile(sourcePath: string, destinationPath: string): Promise<void> {
    console.log('Uploading picture...');
    await fs.rename(sourcePath, destinationPath);
    console.log('File uploaded successfully.');
  }

  async saveFileFromBuffer(base64String: string, destinationPath: string): Promise<void> {
    console.log('Uploading picture...');
    const imageBuffer = Buffer.from(base64String, 'base64');
    await fs.writeFile(destinationPath, imageBuffer);
    console.log('File uploaded successfully.');
  }

  async deleteFileById(id: string): Promise<void> {
    console.log(`Deleting file for id ${id}...`);

    // Construct the file path based on the provided pattern
    const filePath = `./images/${id}`;

    try {
      // Check if the file exists
      await fs.access(filePath);

      // Delete the file
      await fs.unlink(filePath);

      console.log(`File for id ${id} deleted successfully.`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File not found
        throw new NotFoundException(`File not found for id ${id}`);
      }
      throw error; // Propagate other errors
    }
  }

  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  }
}