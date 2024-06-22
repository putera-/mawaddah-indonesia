import { PartialType } from '@nestjs/mapped-types';
import { CreateMarriagePreparationDto } from './create-marriage_preparation.dto';

export class UpdateMarriagePreparationDto extends PartialType(CreateMarriagePreparationDto) {}
