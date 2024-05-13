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
    async blurringImage(size, buffer, filepath) {
        const resizedBuffer = await sharp(buffer, { animated: true })
            .blur(50)
            .resize(size)
            .toBuffer();

        const dir = path.dirname(filepath);
        await fs.mkdir(dir, { recursive: true });
        fs.writeFile(filepath, resizedBuffer);
    }
}

// return await sharp(buffer)
//     .blur(10) // Adjust blur strength as needed
//     .toBuffer();
