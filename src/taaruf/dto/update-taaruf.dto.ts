import { PartialType } from '@nestjs/mapped-types';
import { CreateTaarufDto } from './create-taaruf.dto';

export class UpdateTaarufDto extends PartialType(CreateTaarufDto) {}
