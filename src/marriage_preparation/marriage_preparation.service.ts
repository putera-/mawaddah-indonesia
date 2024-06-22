import { Injectable } from '@nestjs/common';
import { CreateMarriagePreparationDto } from './dto/create-marriage_preparation.dto';
import { UpdateMarriagePreparationDto } from './dto/update-marriage_preparation.dto';

@Injectable()
export class MarriagePreparationService {
  create(createMarriagePreparationDto: CreateMarriagePreparationDto) {
    return 'This action adds a new marriagePreparation';
  }

  findAll() {
    return `This action returns all marriagePreparation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marriagePreparation`;
  }

  update(id: number, updateMarriagePreparationDto: UpdateMarriagePreparationDto) {
    return `This action updates a #${id} marriagePreparation`;
  }

  remove(id: number) {
    return `This action removes a #${id} marriagePreparation`;
  }
}
