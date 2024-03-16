import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { Prisma } from '@prisma/client';
import { Slider } from './slider.interface';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';

@Injectable()
export class SliderService {
  constructor(private prisma: PrismaService, private appService: AppService) { }
  async create(data: Prisma.SliderCreateInput) {
    const client = await this.prisma.client.findFirst();
    //connection slider to client
    data.Client = {
      connect: { id: client.id }
    };
    return this.prisma.slider.create({ data });
  };

  findAll() {
    return this.prisma.slider.findMany();
  };

  async findOne(id: string): Promise<Slider> {
    const slider = await this.prisma.slider.findFirst({ where: { id } });
    if (!slider) throw new NotFoundException('slider not found')
    return slider;
  };

  async update(id: string, data: UpdateSliderDto): Promise<Slider> {
    //simpan dalam variable path photo lama
    const { photo: oldPhoto } = await this.findOne(id);

    const slider = await this.prisma.slider.update({
      where: { id },
      data
    });
    //jika ada data.photo > photo dirubah, photo yang lama harus diapus setalah berasil update
    if (data.photo) {
      //hapus photo lama disini
      this.appService.removeFile(oldPhoto);
    }
    return slider;

  };

  async remove(id: string): Promise<void> {
    const { photo } = await this.findOne(id);

    //hapus data slider
    await this.prisma.slider.delete({ where: { id } })

    //hapus file
    if (photo) this.appService.removeFile(photo);

  };
};
