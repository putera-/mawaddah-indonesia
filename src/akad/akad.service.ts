import { Injectable } from '@nestjs/common';
import { CreateAkadDto } from './dto/create-akad.dto';
import { UpdateAkadDto } from './dto/update-akad.dto';

@Injectable()
export class AkadService {
  create(createAkadDto: CreateAkadDto) {
    return 'This action adds a new akad';
  }

  findAll() {
    return `This action returns all akad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} akad`;
  }

  update(id: number, updateAkadDto: UpdateAkadDto) {
    return `This action updates a #${id} akad`;
  }

  remove(id: number) {
    return `This action removes a #${id} akad`;
  }
}
