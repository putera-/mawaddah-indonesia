import { PartialType } from '@nestjs/swagger';
import { CreatePhysicalCriteriaDto } from './create-physical_criteria.dto';

export class UpdatePhysicalCriteriaDto extends PartialType(
    CreatePhysicalCriteriaDto,
) {}
