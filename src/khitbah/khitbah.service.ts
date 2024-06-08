import { Injectable } from '@nestjs/common';
import { CreateKhitbahDto } from './dto/create-khitbah.dto';
import { UpdateKhitbahDto } from './dto/update-khitbah.dto';

@Injectable()
export class KhitbahService {
  create(createKhitbahDto: CreateKhitbahDto) {
    return 'This action adds a new khitbah';
  }

  findAll() {
    return `This action returns all khitbah`;
  }

  findOne(id: number) {
    return `This action returns a #${id} khitbah`;
  }

  update(id: number, updateKhitbahDto: UpdateKhitbahDto) {
    return `This action updates a #${id} khitbah`;
  }

  remove(id: number) {
    return `This action removes a #${id} khitbah`;
  }
}
