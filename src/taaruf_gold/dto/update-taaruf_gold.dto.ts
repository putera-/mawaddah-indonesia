import { PartialType } from '@nestjs/mapped-types';
import { CreateTaarufGoldDto } from './create-taaruf_gold.dto';

export class UpdateTaarufGoldDto extends PartialType(CreateTaarufGoldDto) {}
