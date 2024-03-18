import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';

@Injectable()
export class AppService {
    async createPath(path: string) {
        try {
            await fs.access(path);
        } catch (error) {
            await fs.mkdir(path);
        }
    }

    async removeFile(file: any) {
        try {
            await fs.rm('.' + file);
        } catch (error) {
            throw error;
        }
    }
}
