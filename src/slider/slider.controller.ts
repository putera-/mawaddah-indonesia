import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ValidationPipe } from '@nestjs/common';
import { SliderService } from './slider.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from 'src/photos/photos.service';
import * as path from 'path';

@Controller('slider')
export class SliderController {
  constructor(
    private readonly sliderService: SliderService,
    private readonly photoService: PhotosService
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(@Body(new ValidationPipe()) data: CreateSliderDto, @UploadedFile() file: Express.Multer.File) {
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
        data.photo = `/uploads/photos/${uniqueSuffix}_lg.${ext}`;
      }

      return this.sliderService.create(data as Prisma.SliderCreateInput);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    try {
      return this.sliderService.findAll();

    } catch (error) {
      throw error;

    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.sliderService.findOne(id);

    } catch (error) {
      throw error;

    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  async update(@Param('id') id: string, @Body(new ValidationPipe()) data: UpdateSliderDto, @UploadedFile() file: Express.Multer.File) {
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
      }

      return this.sliderService.update(id, data);

    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.sliderService.remove(id);

    } catch (error) {
      throw error;

    }
  }
}
