import { PartialType } from '@nestjs/mapped-types';
import { CreatePhysicalCharDto } from './create-physical_char.dto';

export class UpdatePhysicalCharDto extends PartialType(CreatePhysicalCharDto) {}
