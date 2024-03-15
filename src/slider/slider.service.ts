import { Injectable } from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SliderService {
  create(createSliderDto: CreateSliderDto) {
    return 'This action adds a new slider';
  }

  findAll() {
    return 'This action returns all slider';
  }

  findOne(id: number) {
    return `This action returns a #${id} slider`;
  }

  update(id: number, updateSliderDto: UpdateSliderDto) {
    return `This action updates a #${id} slider`;
  }

  remove(id: number) {
    return `This action removes a #${id} slider`;
  }
}
