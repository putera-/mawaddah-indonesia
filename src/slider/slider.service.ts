import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { Prisma } from '@prisma/client';
import { Slider } from './slider.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SliderService {
  constructor(private prisma: PrismaService) { }
  create(data: Prisma.SliderCreateInput) {
    console.log(data)
    return
    // return this.prisma.slider.create({
    //   data
    // });

  }

  findAll() {
    return this.prisma.slider.findMany();
  }

  async findOne(id: string): Promise<Slider> {
    const slider = await this.prisma.slider.findFirst({ where: { id } });
    if (!slider) throw new NotFoundException('slider not found')
    return slider;
  }

  update(id: string, updateSliderDto: UpdateSliderDto) {
    return `This action updates a #${id} slider`;
  }

  remove(id: string) {
    return `This action removes a #${id} slider`;
  }


}
