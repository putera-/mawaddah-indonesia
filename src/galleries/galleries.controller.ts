import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ValidationPipe, UploadedFile, HttpCode } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from 'src/photos/photos.service';
import * as path from 'path';
import { AppService } from 'src/app.service';

@Controller('galleries')
export class GalleriesController {
  constructor(
    private readonly galleriesService: GalleriesService,
    private readonly photoService: PhotosService,
    private readonly appService: AppService
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(@Body(new ValidationPipe()) data: CreateGalleryDto, @UploadedFile() file: Express.Multer.File) {
    // for avatar
    const ext = file ? file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
      if (file) {
        const avatarBuffer = file.buffer;

        // resize images to 600, 900, 1200
        const sizes = [{ key: 'lg', size: 1200 }];
        await Promise.all(
          sizes.map(async (s) => {
            const { key, size } = s;
            const filename = `${uniqueSuffix}_${key}.${ext}`;
            const filepath = path.join('./public/photos/' + filename);

            await this.photoService.resize(size, avatarBuffer, filepath);
          })
        );
        data.photo = `/public/photos/${uniqueSuffix}_lg.${ext}`;
      };
      console.log(file)
      console.log(data)

      return this.galleriesService.create(data as Prisma.GalleryCreateInput);
    } catch (error) {
      //jika terjadi error, hapus photo yang tersimpan
      if (file) {
        //hapus photo jika ada file
        this.appService.removeFile(`/public/photos/${uniqueSuffix}_lg.${ext}`);
      }

      throw error;
    };
  };
  @Get()
  findAll() {
    return this.galleriesService.findAll();
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleriesService.findOne(id);
  };

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  async update(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdateGalleryDto, @UploadedFile() file: Express.Multer.File) {
    // for photo
    const ext = file ? file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    try {
      if (file) {
        const avatarBuffer = file.buffer;

        // resize images to 600, 900, 1200
        const sizes = [{ key: 'lg', size: 1200 }];
        await Promise.all(
          sizes.map(async (s) => {
            const { key, size } = s;
            const filename = `${uniqueSuffix}_${key}.${ext}`;
            const filepath = path.join('./public/photos/' + filename);

            await this.photoService.resize(size, avatarBuffer, filepath);
          })
        );

        data.photo = `/public/photos/${uniqueSuffix}_lg.${ext}`;
      };

      return this.galleriesService.update(id, data);

    } catch (error) {
      //jika terjadi error, hapus photo yang tersimpan
      if (file) {
        //hapus photo jika ada file
        this.appService.removeFile(`/public/photos/${uniqueSuffix}_lg.${ext}`);
      };

      throw error;
    };
  };

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    try {
      return this.galleriesService.remove(id);

    } catch (error) {
      throw error;

    };
  };
};