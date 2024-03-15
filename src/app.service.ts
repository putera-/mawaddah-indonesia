import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async createPath(path: string) {
    try {
      await fs.access(path);
    } catch (error) {
      await fs.mkdir(path);
    }
  }

  async removeFile(file : any) {
    try {
      await fs.rm('.' + file);
    } catch (error) {
      throw (error);
    }
  };
}
