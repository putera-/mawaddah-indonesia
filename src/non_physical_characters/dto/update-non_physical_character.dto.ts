import { PartialType } from '@nestjs/mapped-types';
import { CreateNonPhysicalCharacterDto } from './create-non_physical_character.dto';

export class UpdateNonPhysicalCharacterDto extends PartialType(CreateNonPhysicalCharacterDto) {}
