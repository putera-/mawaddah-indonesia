import { PartialType } from '@nestjs/mapped-types';
import { CreatePhysicalCriteriaDto } from './create-physical_criteria.dto';

export class UpdatePhysicalCriteriaDto extends PartialType(
    CreatePhysicalCriteriaDto,
) {}
