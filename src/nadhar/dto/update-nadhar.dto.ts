import { PartialType } from '@nestjs/mapped-types';
import { CreateNadharDto } from './create-nadhar.dto';

export class UpdateNadharDto extends PartialType(CreateNadharDto) {}
