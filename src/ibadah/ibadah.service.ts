import { Injectable } from '@nestjs/common';
import { CreateIbadahDto } from './dto/create-ibadah.dto';
import { UpdateIbadahDto } from './dto/update-ibadah.dto';

@Injectable()
export class IbadahService {
  create(createIbadahDto: CreateIbadahDto) {
    return 'This action adds a new ibadah';
  }

  findAll() {
    return `This action returns all ibadah`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ibadah`;
  }

  update(id: number, updateIbadahDto: UpdateIbadahDto) {
    return `This action updates a #${id} ibadah`;
  }

  remove(id: number) {
    return `This action removes a #${id} ibadah`;
  }
}
