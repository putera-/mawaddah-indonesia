import { Injectable } from '@nestjs/common';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';

@Injectable()
export class NadharService {
  create(createNadharDto: CreateNadharDto) {
    return 'This action adds a new nadhar';
  }

  findAll() {
    return `This action returns all nadhar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nadhar`;
  }

  update(id: number, updateNadharDto: UpdateNadharDto) {
    return `This action updates a #${id} nadhar`;
  }

  remove(id: number) {
    return `This action removes a #${id} nadhar`;
  }
}
