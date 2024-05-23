import { Injectable } from '@nestjs/common';
import { CreateNadharDto } from './dto/create-nadhar.dto';
import { UpdateNadharDto } from './dto/update-nadhar.dto';

@Injectable()
export class NadharService {
  create(createNadharDto: CreateNadharDto) {
    return 'This action adds a new nadhar';
  }

  updateDate(id: string, updateNadharDto: UpdateNadharDto) {
    return `This action updates a #${id} nadhar`;
  }
  cancel(id: string, updateNadharDto: UpdateNadharDto) {
    return `This action updates a #${id} nadhar`;
  }
  approve(id: string, updateNadharDto: UpdateNadharDto) {
    return `This action updates a #${id} nadhar`;
  }
  reject(id: string, updateNadharDto: UpdateNadharDto) {
    return `This action updates a #${id} nadhar`;
  }

}
