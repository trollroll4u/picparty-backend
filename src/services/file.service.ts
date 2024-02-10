// file.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class FileService {
  async saveFile(sourcePath: string, destinationPath: string): Promise<void> {
    console.log('Uploading picture...');
    await fs.rename(sourcePath, destinationPath);
    console.log('File uploaded successfully.');
  }

  async saveFileFromBuffer(buffer: Buffer, destinationPath: string): Promise<void> {
    console.log('Uploading picture...');
    await fs.writeFile(destinationPath, buffer);
    console.log('File uploaded successfully.');
  }

  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  }
}