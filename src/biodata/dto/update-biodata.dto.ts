import { PartialType } from '@nestjs/mapped-types';
import { CreateBiodatumDto } from './create-biodatum.dto';

export class UpdateBiodataDto extends PartialType(CreateBiodatumDto) { }
