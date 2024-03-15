import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import sharp from 'sharp';

@Injectable()
export class PhotosService {
  async resize(size, buffer, filepath) {
    const resizedBuffer = await sharp(buffer, { animated: true })
      .resize(size)
      .toBuffer();

    // Save the resized image to disk
    fs.writeFile(filepath, resizedBuffer);
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
