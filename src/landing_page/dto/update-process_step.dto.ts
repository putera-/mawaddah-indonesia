import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessStepDto } from './create-process_step.dto';

export class UpdateProcessStepDto extends PartialType(CreateProcessStepDto) {}
