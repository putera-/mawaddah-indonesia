import { Injectable } from '@nestjs/common';
import { CreateTaarufDto } from './dto/create-taaruf.dto';
import { UpdateTaarufDto } from './dto/update-taaruf.dto';

@Injectable()
export class TaarufService {
  create(createTaarufDto: CreateTaarufDto) {
    return 'This action adds a new taaruf';
  }

  findAll() {
    return `This action returns all taaruf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taaruf`;
  }

  update(id: number, updateTaarufDto: UpdateTaarufDto) {
    return `This action updates a #${id} taaruf`;
  }

  remove(id: number) {
    return `This action removes a #${id} taaruf`;
  }
}
