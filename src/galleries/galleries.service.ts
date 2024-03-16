import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { Prisma } from '@prisma/client';
import { Gallery } from './galleries.interface';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';

@Injectable()
export class GalleriesService {
  constructor(private prisma: PrismaService, private AppService: AppService) { }
  async create(data: Prisma.GalleryCreateInput) {
    const client = await this.prisma.client.findFirst();
    //connection gallery to client
    data.Client = {
      connect: { id: client.id }
    };
    return this.prisma.gallery.create({ data });
  };


  findAll() {
    return this.prisma.gallery.findMany();
  }

  async findOne(id: string) {
    const gallery = await this.prisma.gallery.findFirst({ where: { id } });
    if (!gallery) throw new NotFoundException('gallery not found')
    return gallery;
  }

  async update(id: string, data: UpdateGalleryDto): Promise<Gallery> {
    //simpan dalam variable path photo lama
    const { photo: oldPhoto } = await this.findOne(id);

    const gallery = await this.prisma.gallery.update({
      where: { id },
      data
    });
    //jika ada data.photo > photo dirubah, photo yang lama harus diapus setalah berasil update
    if (data.photo) {
      //hapus photo lama disini
      this.AppService.removeFile(oldPhoto);
    }
    return gallery;
  }

  async remove(id: string): Promise<void> {
    const { photo } = await this.findOne(id);

    //hapus data gallery
    await this.prisma.gallery.delete({ where: { id } })

    //hapus file
    if (photo) this.AppService.removeFile(photo);

  }
}
