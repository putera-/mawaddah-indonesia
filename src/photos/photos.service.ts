import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import sharp from 'sharp';

@Injectable()
export class PhotosService {
    async resize(size, buffer, filepath) {
        const resizedBuffer = await sharp(buffer, { animated: true })
            .resize(size)
            .toBuffer();

        // Ensure the directory exists before writing the file
        const dir = path.dirname(filepath);
        await fs.mkdir(dir, { recursive: true });

        // Save the resized image to disk
        fs.writeFile(filepath, resizedBuffer);
    }
    async removeFile(file) {
        try {
            await fs.rm('.' + file);
        } catch (error) {
            throw error;
        }
    }
    //   create(createPhotoDto: CreatePhotoDto) {
    //     return 'This action adds a new photo';
    //   }

    //   findAll() {
    //     return `This action returns all photos`;
    //   }

    //   findOne(id: number) {
    //     return `This action returns a #${id} photo`;
    //   }

    //   update(id: number, updatePhotoDto: UpdatePhotoDto) {
    //     return `This action updates a #${id} photo`;
    //   }

    //   remove(id: number) {
    //     return `This action removes a #${id} photo`;
    //   }
}
