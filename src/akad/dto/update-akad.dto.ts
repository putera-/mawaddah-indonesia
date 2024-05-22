import { PartialType } from '@nestjs/mapped-types';
import { CreateAkadDto } from './create-akad.dto';

export class UpdateAkadDto extends PartialType(CreateAkadDto) {}
